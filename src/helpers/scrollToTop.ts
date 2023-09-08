/**
 * Scrolls the web page to the top in a smooth manner.
 */
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
