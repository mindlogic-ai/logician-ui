import { describe, expect, it } from 'vitest';

import { trimUrlBoundary } from './urlBoundary';

describe('trimUrlBoundary', () => {
  it('cuts at the closing bracket that has no opener', () => {
    // The 경복대 입시 챗봇 case: `홈페이지(URL)의` — GFM keeps `)의` in the href.
    expect(trimUrlBoundary('https://kbu.ac.kr/efms/Main.do)의')).toBe(
      'https://kbu.ac.kr/efms/Main.do'
    );
    expect(trimUrlBoundary('https://example.com/a]에서')).toBe(
      'https://example.com/a'
    );
  });

  it('keeps brackets that the URL itself opened', () => {
    expect(trimUrlBoundary('https://ko.wikipedia.org/wiki/괄호_(문서)')).toBe(
      'https://ko.wikipedia.org/wiki/괄호_(문서)'
    );
  });

  it('leaves a URL with no unmatched bracket alone', () => {
    expect(trimUrlBoundary('https://kbu.ac.kr/efms/Main.do')).toBe(
      'https://kbu.ac.kr/efms/Main.do'
    );
  });

  it('does not cut away the host', () => {
    expect(trimUrlBoundary('https://)')).toBe('https://)');
  });

  it('leaves non-http autolinks (mailto:) untouched', () => {
    expect(trimUrlBoundary('mailto:foo@example.com)의')).toBe(
      'mailto:foo@example.com)의'
    );
  });
});
