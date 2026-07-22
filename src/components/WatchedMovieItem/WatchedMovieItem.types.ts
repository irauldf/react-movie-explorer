import type { WatchedMovie } from "types";

export interface WatchedMovieItemProps {
  watchedMovie: WatchedMovie;
  onDeleteWatchedMovie: (id: string) => void;
}
