export function observeElement(renderRoot: HTMLElement | ShadowRoot, selector: string): Promise<Element | null> {
  return new Promise((resolve) => {
    if (renderRoot.querySelector(selector)) {
      return resolve(renderRoot.querySelector(selector));
    }
    const observer = new MutationObserver(() => {
      if (renderRoot.querySelector(selector)) {
        resolve(renderRoot.querySelector(selector));
        observer.disconnect();
      }
    });
    observer.observe(renderRoot, {
      childList: true,
      subtree: true,
    });
  });
}
