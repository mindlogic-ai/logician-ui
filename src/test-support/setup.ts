/**
 * Vitest test setup — loaded before the suite runs.
 */

import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement element scrolling; canvas components that autoscroll
// (e.g. focusing a field) call scrollTo on container elements in tests.
if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = () => {};
}
