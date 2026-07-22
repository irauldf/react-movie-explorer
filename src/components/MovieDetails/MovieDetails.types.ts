import { WatchedMovie } from "types";

export interface MovieDetailsProps {
  id: string;
  watchedMovies: WatchedMovie[];
  onCloseMovie: () => void;
  onAddWatched: (watchedMovie: WatchedMovie) => void;
}
