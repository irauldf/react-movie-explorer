import type { Movie } from "types";

export interface MovieListProps {
  movies: Movie[];
  onSelectMovie: (id: string) => void;
}
