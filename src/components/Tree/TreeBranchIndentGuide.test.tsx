import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import { system } from '../../theme';
import { createTreeCollection } from './index';
import { Tree } from './Tree';

interface N {
  id: string;
  name: string;
  children?: N[];
}

const sample: N = {
  id: 'ROOT',
  name: '',
  children: [{ id: 'a', name: 'A', children: [{ id: 'a1', name: 'A1' }] }],
};

const collection = createTreeCollection<N>({
  rootNode: sample,
  nodeToValue: (n) => n.id,
  nodeToString: (n) => n.name,
});

const renderNode = ({
  node,
  nodeState,
}: {
  node: N;
  nodeState: { isBranch: boolean };
}) =>
  nodeState.isBranch ? (
    <Tree.BranchControl>
      <Tree.BranchText>{node.name}</Tree.BranchText>
    </Tree.BranchControl>
  ) : (
    <Tree.Item>
      <Tree.ItemText>{node.name}</Tree.ItemText>
    </Tree.Item>
  );

function renderGuide(elbow: boolean) {
  const { container } = render(
    <ChakraProvider value={system}>
      <Tree.Root
        collection={collection}
        aria-label="t"
        defaultExpandedValue={['a']}
      >
        <Tree.Tree>
          <Tree.Node
            indentGuide={
              elbow ? (
                <Tree.BranchIndentGuide elbow />
              ) : (
                <Tree.BranchIndentGuide />
              )
            }
            render={renderNode}
          />
        </Tree.Tree>
      </Tree.Root>
    </ChakraProvider>
  );
  const guide = container.querySelector<HTMLElement>(
    '[data-part="branch-indent-guide"]'
  );
  if (!guide) throw new Error('no indent guide rendered');
  return guide.className;
}

// All Chakra/emotion-injected CSS, concatenated.
const sheetText = () =>
  Array.from(document.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('\n');

// The foot rule is anchored on the emotion-generated `css-*` class
// (not the static `chakra-*` slot class), so target that one.
const styleAnchor = (className: string) => {
  const emotion = className
    .trim()
    .split(/\s+/)
    .find((c) => /^css-/.test(c));
  if (!emotion) throw new Error(`no emotion class in: ${className}`);
  return '\\.' + emotion;
};

/**
 * Regression guard for the `elbow` foot. Chakra renders ONE indent guide
 * per `branchContent` (its first child), followed by that branch's rows
 * as siblings — so the foot must be drawn on those sibling rows, scoped
 * to the elbow guide's own class. An earlier `:last-of-type::after`
 * attempt silently matched nothing (the guide is never the last sibling
 * of its type), which is exactly what these tests pin down.
 */
describe('Tree.BranchIndentGuide elbow', () => {
  it('draws a ::before foot on the guide’s sibling rows when elbow is set', () => {
    const cls = renderGuide(true);
    const anchor = styleAnchor(cls);
    const css = sheetText();

    // Foot rule is scoped to THIS guide's class via the sibling combinator,
    // for both leaf rows and branch rows — never applied globally.
    expect(css).toMatch(
      new RegExp(`${anchor}\\s*~\\s*\\[data-part="item"\\]::before`)
    );
    expect(css).toMatch(
      new RegExp(
        `${anchor}\\s*~\\s*\\[data-part="branch"\\]\\s*>\\s*\\[data-part="branch-control"\\]::before`
      )
    );

    // The foot paints a 1px cross-stroke pinned to the row's vertical
    // centre, starting at the parent rail column.
    const footRule =
      css.match(
        new RegExp(
          `${anchor}\\s*~\\s*\\[data-part="item"\\]::before\\s*\\{[^}]*\\}`
        )
      )?.[0] ?? '';
    expect(footRule).toContain('content:""');
    expect(footRule).toContain('position:absolute');
    expect(footRule).toContain('inset-block-start:50%');
    expect(footRule).toContain('height:1px');
    expect(footRule).toMatch(
      /inset-inline-start:calc\(var\(--tree-offset\) - var\(--tree-indentation\)\)/
    );
  });

  it('draws no foot for a plain guide (no elbow)', () => {
    const cls = renderGuide(false);
    const anchor = styleAnchor(cls);
    // This specific guide's class must not anchor any ::before foot rule.
    expect(sheetText()).not.toMatch(new RegExp(`${anchor}\\s*~[^{]*::before`));
  });
});
