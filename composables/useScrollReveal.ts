import { onMounted, onUnmounted } from "vue";

export const useScrollReveal = (selector = ".reveal-on-scroll") => {
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    // Guard against environments without DOM or IntersectionObserver
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const elements = document.querySelectorAll(selector);
    if (!elements.length) {
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal-visible");
          observer?.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer?.observe(el));
  });

  onUnmounted(() => {
    observer?.disconnect();
  });
};
