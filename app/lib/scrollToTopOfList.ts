// Paging through products should put the first item of the new page in view.
// A fixed value does not survive different viewports or a header that grows
// with the announcement bar, so the header is measured at call time.
const FALLBACK_HEADER_HEIGHT = 120;
const BREATHING_ROOM = 8;

export function scrollToTopOfList(element: HTMLElement | null): void {
  if (typeof window === 'undefined') return;

  const header = document.querySelector<HTMLElement>('.fixed.top-0.z-50');
  const headerHeight = header?.offsetHeight ?? FALLBACK_HEADER_HEIGHT;

  // Without an element to aim at, the top of the page is still better than
  // leaving the reader halfway down the previous page.
  const elementTop = element
    ? element.getBoundingClientRect().top + window.scrollY
    : 0;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.scrollTo({
    top: Math.max(0, elementTop - headerHeight - BREATHING_ROOM),
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  });
}
