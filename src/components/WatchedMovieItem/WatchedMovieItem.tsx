import type { WatchedMovieItemProps } from "./WatchedMovieItem.types";

export function WatchedMovieItem(props: WatchedMovieItemProps) {
  return (
    <li key={props.watchedMovie.imdbID}>
      <img
        src={props.watchedMovie.Poster}
        alt={`${props.watchedMovie.Title} poster`}
      />
      <h3>{props.watchedMovie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{props.watchedMovie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{props.watchedMovie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{props.watchedMovie.Runtime} min</span>
        </p>
        <button className="btn-delete" onClick={() => props.onDeleteWatchedMovie(props.watchedMovie.imdbID)}>
          X
        </button>
      </div>
    </li>
  );
}
