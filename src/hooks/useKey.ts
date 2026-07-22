import { useEffect } from "react";

export function useKey(key: string, action: Function) {
  useEffect(() => {
    function eventHandler(e: KeyboardEvent) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }

    document.addEventListener("keydown", eventHandler);

    return () => document.removeEventListener("keydown", eventHandler);
  }, [key, action]);
}
