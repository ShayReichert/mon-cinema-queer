import { useEffect, useState, useMemo } from "react";
// import { mockMovieCredits, mockMovieReleaseDates, mockMovieKeywords, mockMovieDetails } from "../data/mockData";
import { codeLang } from "../data/codeLang";
import { getCertifications, maxTextLength } from "../functions/helpers";
import { getMovieCredits, getMovieReleaseDates, getMovieKeywords, getMovieDetails } from "../functions/api";

function Card({ info }) {
  const [movieCredits, setMovieCredits] = useState([]);
  const [movieReleaseDates, setMovieReleaseDates] = useState([]);
  const [movieKeywords, setMovieKeywords] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const resMovieCredits = await getMovieCredits(info.id);
        setMovieCredits(resMovieCredits.data);
      } catch (err) {
        setError(err);
      }

      try {
        const resMovieReleaseDates = await getMovieReleaseDates(info.id);
        setMovieReleaseDates(resMovieReleaseDates.data);
      } catch (err) {
        setError(err);
      }

      try {
        const resMovieKeywords = await getMovieKeywords(info.id);
        setMovieKeywords(resMovieKeywords.data);
      } catch (err) {
        setError(err);
      }

      try {
        const resMovieDetails = await getMovieDetails(info.id);
        setMovieDetails(resMovieDetails.data);
      } catch (err) {
        setError(err);
      }
    }
    getData();
  }, [info.id]);

  //   Director
  const director = useMemo(() => {
    if (error || !movieCredits.crew) {
      return;
    }
    return movieCredits.crew.filter(({ job }) => job === "Director");
  }, [error, movieCredits]);

  //   Original language
  const lang = Object.fromEntries(Object.entries(codeLang).filter(([key]) => key.includes(info.original_language)));

  //   Tags
  const tags = useMemo(() => {
    if (error || !movieKeywords.keywords) {
      return;
    }
    return movieKeywords.keywords.map((keyword) => keyword.name);
  }, [error, movieKeywords]);

  //   Image
  const basePathImage = "https://image.tmdb.org/t/p/w500";
  const movieImage = useMemo(() => {
    if (error || !movieDetails.poster_path) {
      return;
    }
    return basePathImage + movieDetails.poster_path;
  }, [error, movieDetails]);

  return (
    movieImage && (
      <div className="card">
        <div className="image-wrapper">
          <div className="image">
            <img src={movieImage} alt={`Affiche de ${info.original_title}`} />
          </div>
          <div className="image-overlay">
            <div className="content">
              {info.overview && (
                <div className="info synopsis">
                  <strong>Synopsis</strong> : {maxTextLength(info.overview, 300)}
                  {info.overview.length > 200 && <span>...</span>}
                </div>
              )}

              {director[0]?.name && (
                <div className="info director">
                  <strong>Réalisateur·ice</strong> : {director[0]?.name}
                </div>
              )}

              {lang[info.original_language]?.name && (
                <div className="info language">
                  <strong>Langue originale</strong> : {lang[info.original_language]?.name}
                </div>
              )}

              {getCertifications(movieReleaseDates) && <div className="info age-limit">- {getCertifications(movieReleaseDates)} ans</div>}

              {tags && (
                <div className="info tags">
                  <strong>Mots clés</strong> :{" "}
                  {tags.slice(0, 6).map((tag, key) => {
                    const isLastTag = key + 1 === 6 || key + 1 === tags.length;
                    return (
                      <span key={key}>
                        {tag}
                        {!isLastTag && ", "}
                        {isLastTag && "."}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="movie-title">
          {info.original_title && <h3>{info.original_title}</h3>}
          {info.release_date && <div className="year">{info.release_date.match(/^\d{4}/)}</div>}
        </div>
      </div>
    )
  );
}

export default Card;
