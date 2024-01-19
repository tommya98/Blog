import { useEffect, useRef } from "react";

const useTocScroll = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement === null) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      if (target.tagName !== "A") return;

      e.preventDefault();
      const targetHref = target.getAttribute("href") as string;
      if (target) {
        const target = Array.from(contentElement.querySelectorAll("a")).filter(
          (anchor) => anchor.getAttribute("href")?.includes(targetHref)
        )[0] as HTMLAnchorElement;
        if (target) {
          const targetPosition =
            target.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: targetPosition - 60, behavior: "smooth" });
        }
      }
    };

    const anchors = contentElement.querySelectorAll("a");
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleClick);
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return contentRef;
};

export default useTocScroll;