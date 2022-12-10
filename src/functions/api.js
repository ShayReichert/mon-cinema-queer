import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

function fetchMoviesData(query) {
  const baseURL = "https://api.themoviedb.org/3";

  const url = `${baseURL}${query}`;

  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getMoviesDiscover(page) {
  const keywords = "250606|158718|264384|264386";
  const date = new Date().toISOString().split("T")[0];
  const query = `/discover/movie?api_key=${apiKey}&sort_by=release_date.desc&page=${page}&release_date.lte=${date}&with_keywords=${keywords}`;

  return fetchMoviesData(query);
}

export function getMovieCredits(id) {
  const query = `/movie/${id}/credits?api_key=${apiKey}`;

  return fetchMoviesData(query);
}

export function getMovieReleaseDates(id) {
  const query = `/movie/${id}/release_dates?api_key=${apiKey}`;

  return fetchMoviesData(query);
}

export function getMovieKeywords(id) {
  const query = `/movie/${id}/keywords?api_key=${apiKey}`;

  return fetchMoviesData(query);
}

export function getMovieDetails(id) {
  const query = `/movie/${id}?api_key=${apiKey}`;

  return fetchMoviesData(query);
}
