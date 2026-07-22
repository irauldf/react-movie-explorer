import type { NumResultsProps } from "./NumResults.types";

export function NumResults(props: NumResultsProps) {
  return (
    <p className="num-results">
      Found <strong>{props.movies.length}</strong> results
    </p>
  );
}
