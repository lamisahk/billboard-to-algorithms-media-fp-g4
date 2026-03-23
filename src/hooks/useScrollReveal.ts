import { useEffect, useRef } from "react";

/**
 * Pudding-style scroll reveal hook.
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters view, it gets the `is-visible` class.
 *
 * @param threshold  - visibility ratio to trigger (default 0.15)
 * @param once       - only trigger once (default true)
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
  once = true
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove("is-visible");
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return ref;
}

/**
 * Observe multiple children inside a container.
 * Applies `is-visible` to the container when it enters view,
 * which triggers stagger animations on children via CSS.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1
) {
  return useScrollReveal<T>(threshold, true);
}
