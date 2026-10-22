/**
 * Doc-only language switch for the Storybook guideline pages.
 *
 * One MDX file carries both languages: wrap each block in `<En>` / `<Ko>` and
 * put `<LangToggle />` at the top of the page. The choice is kept in
 * localStorage (default English) and every block on the page — and on every
 * other guideline page — follows it.
 *
 * Not part of the published library: nothing in `src/index.ts` imports it,
 * `check-component-exports.js` only scans `src/components`, and the rollup
 * build excludes `src/guidelines/**`.
 */
import { ReactNode, useSyncExternalStore } from 'react';

type DocLang = 'en' | 'ko';

const STORAGE_KEY = 'logician-ui:docs-lang';
const listeners = new Set<() => void>();
let current: DocLang | undefined;

const read = (): DocLang => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'ko' ? 'ko' : 'en';
  } catch {
    return 'en';
  }
};

const write = (lang: DocLang) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Storage blocked (private mode): the switch still works for this page.
  }
  current = lang;
  listeners.forEach((notify) => notify());
};

const snapshot = (): DocLang => (current ??= read());

// Another tab changed it: one listener for the whole page, not one per block.
const onStorage = (event: StorageEvent) => {
  if (event.key !== STORAGE_KEY) return;
  current = read();
  listeners.forEach((notify) => notify());
};

const subscribe = (notify: () => void) => {
  if (listeners.size === 0) window.addEventListener('storage', onStorage);
  listeners.add(notify);
  return () => {
    listeners.delete(notify);
    if (listeners.size === 0) window.removeEventListener('storage', onStorage);
  };
};

/** The language the reader picked; `'en'` until they pick one. */
const useDocLang = (): DocLang =>
  useSyncExternalStore(subscribe, snapshot, () => 'en');

const pick = <V,>(lang: DocLang, en: V, ko: V) => (lang === 'ko' ? ko : en);

const Block = ({ lang, children }: { lang: DocLang; children: ReactNode }) =>
  useDocLang() === lang ? <div lang={lang}>{children}</div> : null;

/** English block. Leave a blank line after the opening tag so Markdown parses. */
export const En = ({ children }: { children: ReactNode }) => (
  <Block lang="en">{children}</Block>
);

/** Korean block. Leave a blank line after the opening tag so Markdown parses. */
export const Ko = ({ children }: { children: ReactNode }) => (
  <Block lang="ko">{children}</Block>
);

/** Inline text in the reader's language, for captions and table cells. */
export const T = ({ en, ko }: { en: ReactNode; ko: ReactNode }) => {
  const lang = useDocLang();
  return <span lang={lang}>{pick(lang, en, ko)}</span>;
};

const OPTIONS: { value: DocLang; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'ko', label: '한국어' },
];

/** Top-of-page switch. Renders as a two-button segmented control. */
export const LangToggle = () => {
  const lang = useDocLang();
  return (
    <div
      role="group"
      aria-label="Language / 언어"
      style={{
        display: 'inline-flex',
        border: '1px solid #D8D2CA',
        borderRadius: 8,
        overflow: 'hidden',
        margin: '0 0 16px',
        fontSize: 13,
      }}
    >
      {OPTIONS.map((option) => {
        const active = option.value === lang;
        return (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            aria-pressed={active}
            onClick={() => write(option.value)}
            style={{
              padding: '6px 14px',
              border: 0,
              cursor: 'pointer',
              fontWeight: active ? 700 : 400,
              background: active ? '#252525' : 'transparent',
              color: active ? '#F5EDE0' : '#252525',
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

const VERDICT = {
  do: {
    mark: '✓',
    en: 'Do',
    ko: '이렇게 하세요',
    rule: '#5E7A37',
    ink: '#425C17',
  },
  dont: {
    mark: '×',
    en: "Don't",
    ko: '이렇게 하지 마세요',
    rule: '#A02525',
    ink: '#A02525',
  },
};

/** Do / Don't caption under a `<Canvas>` specimen. */
export const Verdict = ({
  kind,
  en,
  ko,
}: {
  kind: 'do' | 'dont';
  en: ReactNode;
  ko: ReactNode;
}) => {
  const lang = useDocLang();
  const v = VERDICT[kind];
  return (
    <p
      lang={lang}
      style={{
        margin: '-12px 0 28px',
        paddingLeft: 12,
        borderLeft: `3px solid ${v.rule}`,
        fontSize: 14,
        lineHeight: 1.6,
      }}
    >
      <strong style={{ color: v.ink }}>
        {v.mark} {pick(lang, v.en, v.ko)}.
      </strong>{' '}
      {pick(lang, en, ko)}
    </p>
  );
};
