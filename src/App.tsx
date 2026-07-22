import { Navbar } from "components/Navbar";
import { Main } from "components/Main";
import { Logo } from "components/Logo";
import { NumResults } from "components/NumResults";
import { Search } from "components/Search";

import { MovieList } from "components/MovieList";
import { ContainerBox } from "components/ContainerBox";
import { WatchedSummary } from "components/WatchedSummary";
import { WatchedMovieList } from "components/WatchedMovieList";

import { useCallback, useEffect, useState } from "react";
import { Loader } from "components/ui/Loader";
import { ErrorMessage } from "components/ui/ErrorMessage";
import { MovieDetails } from "components/MovieDetails";

import { WatchedMovie } from "types";
import { useLocalStorageState, useMovies } from "hooks";

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("avengers");

  const [watchedMovies, setWatchedMovies] = useLocalStorageState<
    WatchedMovie[]
  >("watched", []);

  const handleCloseMovie = useCallback(() => {
    setSelectedId(null);
  }, []);

  const { movies, isLoading, errorMessage } = useMovies(query);

  function handleSelectedMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleAddWatched(watchedMovie: WatchedMovie) {
    setWatchedMovies((watchedMovies) => [...watchedMovies, watchedMovie]);
  }

  function handleDeleteWatched(id: string) {
    setWatchedMovies((watched) => watched.filter((w) => w.imdbID !== id));
  }

  useEffect(() => {
    handleCloseMovie();
  }, [query, handleCloseMovie]);

  return (
    <>
      <Navbar>
        <Logo key={1} />
        <Search key={2} query={query} setQuery={setQuery} />
        <NumResults key={3} movies={movies} />
      </Navbar>
      <Main>
        <ContainerBox>
          {isLoading && <Loader />}
          {!isLoading && !errorMessage ? (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          ) : (
            <ErrorMessage message={errorMessage} />
          )}
        </ContainerBox>
        <ContainerBox>
          {selectedId ? (
            <MovieDetails
              id={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watchedMovies={watchedMovies}
            />
          ) : (
            <>
              <WatchedSummary watchedMovies={watchedMovies} />
              <WatchedMovieList
                watchedMovies={watchedMovies}
                onDeleteWatchedMovie={handleDeleteWatched}
              />
            </>
          )}
        </ContainerBox>
      </Main>
    </>
  );
}

export default App;
