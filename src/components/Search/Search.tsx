import { useKey } from "hooks/useKey";
import { useEffect, useRef } from "react";
import { SearchProps } from "./Search.types";

export function Search({ query, setQuery }: SearchProps) {
  const inputElementRef = useRef<HTMLInputElement>(null);

  useKey("Enter", function () {
    if (document.activeElement === inputElementRef.current) return;
    inputElementRef.current?.focus();
    setQuery("");
  });

  useEffect(() => inputElementRef.current?.focus(), []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElementRef}
    />
  );
}
