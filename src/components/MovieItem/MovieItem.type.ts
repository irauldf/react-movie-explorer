import type { Movie } from "types";

export interface MovieItemProps {
  movie: Movie;
  onSelectMovie: (id: string) => void;
}
