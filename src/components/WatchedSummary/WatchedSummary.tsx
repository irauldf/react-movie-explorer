import type { WatchedSummaryProps } from "./WatchedSummary.types";

const average = (arr: any[]) =>
  arr.reduce(
    (acc: number, cur: number, i: number, arr: any) => acc + cur / arr.length,
    0,
  );

export function WatchedSummary(props: WatchedSummaryProps) {
  const avgImdbRating = average(
    props.watchedMovies.map((movie) => movie.imdbRating),
  );
  const avgUserRating = average(
    props.watchedMovies.map((movie) => movie.userRating),
  );
  const avgRuntime = average(props.watchedMovies.map((movie) => movie.Runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{props.watchedMovies.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
