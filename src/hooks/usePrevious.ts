import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
