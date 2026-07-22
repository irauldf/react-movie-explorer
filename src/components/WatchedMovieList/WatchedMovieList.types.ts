import type { WatchedMovie } from "types";

export interface WatchedMovieListProps {
  watchedMovies: WatchedMovie[];
  onDeleteWatchedMovie: (id: string) => void;
}
