import { env } from "config/env";
import { Movie } from "types";
const BASE_URL = "http://www.omdbapi.com";

export async function searchMovies(
  query: string,
  signal?: AbortSignal,
): Promise<Movie[]> {
  const response = await fetch(
    `${BASE_URL}/?apikey=${env.omdbApiKey}&s=${query}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error("Something went wrong with fetching movies");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data.Search;
}

export async function getMovieDetail(id: string): Promise<Movie | null> {
  const response = await fetch(`${BASE_URL}/?apikey=${env.omdbApiKey}&i=${id}`);

  if (!response.ok) {
    throw new Error("Something went wrong with getting movie details");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data;
}
