export function getLocalStorageItem<T>(key: string, defaultValue: T): T {
  const item = localStorage.getItem(key);

  if (!item) return defaultValue;

  try {
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
}

export function setLocalStorageItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalStorageItem(key: string): void {
  localStorage.removeItem(key);
}
