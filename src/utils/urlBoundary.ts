/**
 * Korean prose wraps URLs in brackets — `홈페이지(URL)에서`, `사이트([URL])에` — and
 * the closing bracket plus everything after it gets pulled into the href by
 * GFM's autolink literal extension. GFM only drops a trailing unmatched `)`, so
 * the moment a particle follows it (`)에서`) that defence stops working.
 *
 * The repair is deliberately narrow: cut at the bracket that has no opener, and
 * judge nothing else. Trying to tell a Korean particle apart from a Korean path
 * segment is not decidable — `.../공지의` could be either — and prod says it is
 * not worth attempting: over 180 days the wrapper pattern appears 1,363 times
 * against 32 for a particle glued straight onto a URL.
 *
 * Non-http autolinks (GFM turns `foo@example.com` into `mailto:…`) fall out via
 * the host check below, so they pass through untouched.
 */

const CLOSER_TO_OPENER: Record<string, string> = {
  ')': '(',
  ']': '[',
  '}': '{',
};

// A cut that leaves no host went too far (`http://)` → `http://`).
const HAS_HOST = /^(?:https?:\/\/|www\.)[^\s/]+/i;

/** Cut a URL at the first closing bracket that has no matching opener. */
export const trimUrlBoundary = (url: string): string => {
  if (!url) return url;

  const depth: Record<string, number> = { '(': 0, '[': 0, '{': 0 };
  let cut = -1;

  for (let i = 0; i < url.length; i += 1) {
    const char = url[i];
    if (char in depth) {
      depth[char] += 1;
    } else if (char in CLOSER_TO_OPENER) {
      const opener = CLOSER_TO_OPENER[char];
      if (depth[opener] === 0) {
        cut = i;
        break;
      }
      depth[opener] -= 1;
    }
  }

  if (cut === -1) return url;

  const trimmed = url.slice(0, cut);
  return HAS_HOST.test(trimmed) ? trimmed : url;
};
