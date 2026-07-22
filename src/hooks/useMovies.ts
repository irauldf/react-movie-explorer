import { useEffect, useState } from "react";
import { searchMovies } from "services";
import { Movie } from "types";

export function useMovies(query: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setErrorMessage("");
        setIsLoading(true);

        const moviesResp = await searchMovies(query, controller.signal);
        setMovies(moviesResp);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setErrorMessage(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setErrorMessage("");
      return;
    }

    fetchMovies();

    return () => controller.abort();
  }, [query]);

  return { movies, isLoading, errorMessage };
}
