/**
 * Vitest test setup — loaded before the suite runs.
 */

import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement element scrolling; canvas components that autoscroll
// (e.g. focusing a field) call scrollTo on container elements in tests.
if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = () => {};
}

// jsdom has no ResizeObserver, and several Ark-backed parts construct one to
// track their own geometry — SegmentGroup measures the checked item to place its
// indicator. Without this the constructor throws *after* the test body has
// finished, so every assertion passes and the run still exits non-zero with an
// unhandled error, which is a confusing way to fail CI.
if (!('ResizeObserver' in globalThis)) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
