import { MovieItem } from "components/MovieItem";
import type { MovieListProps } from "./MovieList.types";

export function MovieList(props: MovieListProps) {
  return (
    <ul className="list">
      {props.movies?.map((movie) => (
        <MovieItem
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={props.onSelectMovie}
        />
      ))}
    </ul>
  );
}
