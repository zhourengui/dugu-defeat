import { RefObject, useEffect } from "react";

export default function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: Function
) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler(e);
    };

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [handler, ref]);
}
