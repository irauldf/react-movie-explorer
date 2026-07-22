import { WatchedMovieItem } from "components/WatchedMovieItem";
import type { WatchedMovieListProps } from "./WatchedMovieList.types";

export function WatchedMovieList(props: WatchedMovieListProps) {
  return (
    <ul className="list">
      {props.watchedMovies.map((movie) => (
        <WatchedMovieItem
          key={movie.imdbID}
          watchedMovie={movie}
          onDeleteWatchedMovie={props.onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}
