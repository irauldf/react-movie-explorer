import { useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "utils";

export function useLocalStorageState<T>(
  key: string,
  initialState: T,
): readonly [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() =>
    getLocalStorageItem<T>(key, initialState),
  );

  useEffect(() => {
    setLocalStorageItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
