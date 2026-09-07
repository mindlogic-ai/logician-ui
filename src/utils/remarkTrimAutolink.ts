import { trimUrlBoundary } from './urlBoundary';

/**
 * Repairs hrefs that GFM's autolink literal extension over-captured.
 *
 * Korean prose wraps URLs in brackets — `홈페이지(URL)에서`, `사이트([URL])에` — and
 * GFM only drops a *trailing* unmatched `)`. The moment a particle follows the
 * bracket, the whole tail lands inside the href. This runs after remark-gfm,
 * cuts the href at the unmatched bracket, and pushes the over-captured tail out
 * as plain text next to the link.
 *
 * Only autolink literals are touched. A link the author wrote as `[텍스트](URL)`
 * keeps its href verbatim, whatever it contains — including the case where the
 * author used the URL itself as the link text.
 */

interface Point {
  offset?: number;
}

interface MdastNode {
  type: string;
  url?: string;
  value?: string;
  children?: MdastNode[];
  position?: { start: Point; end: Point };
}

/**
 * True only when GFM autolinked a bare URL.
 *
 * The reliable tell is the source span: an autolink literal occupies exactly
 * the characters of the URL it linked, while `[텍스트](URL)` — and equally an
 * authored `[URL](URL)` — always spans the brackets and parens too. That
 * catches even `[https://x/a\)b](https://x/a\)b)`, where escaping makes the
 * label and the destination identical.
 *
 * Positions go missing when a `[` forces remark to re-tokenize the paragraph's
 * inline content (`사이트([URL])에`), which is one of the shapes we most need to
 * repair. There we fall back to label/destination equality: markdown closes a
 * destination at its first unmatched `)`, so an authored link cannot carry one
 * into its href while still matching its label.
 */
const isAutolinkLiteral = (node: MdastNode): boolean => {
  if (node.type !== 'link' || !node.url) return false;
  if (node.children?.length !== 1) return false;

  const [child] = node.children;
  if (child.type !== 'text' || !child.value) return false;

  const start = node.position?.start?.offset;
  const end = node.position?.end?.offset;
  if (start !== undefined && end !== undefined) {
    return end - start === child.value.length;
  }

  return (
    child.value === node.url ||
    `http://${child.value}` === node.url ||
    `https://${child.value}` === node.url
  );
};

const repairChildren = (parent: MdastNode): void => {
  if (!parent.children?.length) return;

  const repaired: MdastNode[] = [];

  for (const node of parent.children) {
    if (!isAutolinkLiteral(node)) {
      repairChildren(node);
      repaired.push(node);
      continue;
    }

    const label = node.children![0].value!;
    const trimmedLabel = trimUrlBoundary(label);

    if (trimmedLabel === label) {
      repaired.push(node);
      continue;
    }

    repaired.push({
      ...node,
      url: trimUrlBoundary(node.url!),
      children: [{ type: 'text', value: trimmedLabel }],
    });
    repaired.push({ type: 'text', value: label.slice(trimmedLabel.length) });
  }

  parent.children = repaired;
};

export const remarkTrimAutolink = () => (tree: MdastNode) => {
  repairChildren(tree);
};
