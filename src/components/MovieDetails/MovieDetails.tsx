import { ErrorMessage } from "components/ui/ErrorMessage";
import { Loader } from "components/ui/Loader";
import { StarRating } from "components/ui/StarRating";
import { env } from "config";
import { useKey } from "hooks/useKey";
import { useEffect, useState, useRef } from "react";
import { getMovieDetail } from "services";
import { Movie, WatchedMovie } from "types";
import { MovieDetailsProps } from "./MovieDetails.types";

export function MovieDetails({
  onCloseMovie,
  id,
  watchedMovies,
  onAddWatched,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const countRef = useRef(0);

  const watchedMovie = watchedMovies.find((w) => w.imdbID === id);
  const watchedMovieRating = watchedMovie ? watchedMovie.userRating || 0 : 0;

  useEffect(() => {
    if (userRating) countRef.current += 1;
  }, [userRating]);

  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setErrorMessage("");
          setIsLoading(true);

          const movieResp = await getMovieDetail(id);
          setMovie(movieResp);
        } catch (err) {
          if (err instanceof Error) {
            setErrorMessage(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      getMovieDetails();
    },
    [id],
  );

  useEffect(
    function () {
      if (!movie?.Title) return;
      document.title = `Movie: ${movie?.Title}`;

      return function () {
        document.title = env.defaultTitle;
      };
    },
    [movie?.Title],
  );

  function handleSetRating(userRating: number) {
    setUserRating(userRating);
  }

  function handleAddWatched() {
    if (!movie) return;

    const watchedMovie: WatchedMovie = {
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      Runtime: Number(movie.Runtime?.split(" ").at(0)),
      imdbID: movie.imdbID,
      imdbRating: Number(movie.imdbRating),
      userRating: userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(watchedMovie);
    onCloseMovie();
  }

  return (
    <div className="details">
      {isLoading && <Loader />}

      {!isLoading && !errorMessage ? (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie?.Poster} alt={`Poster of ${movie?.Title} movie`} />
            <div className="details-overview">
              <h2>{movie?.Title}</h2>
              <p>
                {movie?.Released} &bull; {movie?.Runtime}
              </p>
              <p>{movie?.Genre}</p>
              <p>
                <span>⭐</span>
                {movie?.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!watchedMovie ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={handleSetRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddWatched}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  This movie is on your list ! 🎥
                  {watchedMovieRating > 0 && (
                    <>
                      <br />
                      With a rating of {watchedMovieRating} ⭐
                    </>
                  )}
                </p>
              )}
            </div>
            <p>
              <em>{movie?.Plot}</em>
            </p>
            <p>Starring {movie?.Actors}</p>
            <p>Directed by {movie?.Director}</p>
          </section>
        </>
      ) : (
        <ErrorMessage message={errorMessage} />
      )}
    </div>
  );
}
