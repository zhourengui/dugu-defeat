import { useEffect, useState } from "react";

export default function useDebounceValue<T>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const handler = globalThis.setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debounceValue;
}
