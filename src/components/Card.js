import { mockMovieCredits, mockMovieReleaseDates, mockMovieKeywords, mockMovieDetails } from "../data/mockData";
import { codeLang } from "../data/codeLang";
import { getCertifications, maxTextLength } from "../functions/helpers";

function Card({ info }) {
  //   Director
  const director = mockMovieCredits.crew.filter(({ job }) => job === "Director");

  //   Original language
  const lang = Object.fromEntries(Object.entries(codeLang).filter(([key]) => key.includes(info.original_language)));

  //   Tags
  const tags = mockMovieKeywords.keywords.map((keyword) => keyword.name);

  //   Image
  const basePathImage = "https://image.tmdb.org/t/p/w500";
  const movieImage = basePathImage + mockMovieDetails.poster_path;

  return (
    <div className="card">
      <div className="image-wrapper">
        <div className="image">
          <img src={movieImage} alt="Affiche de Dune" />
        </div>
        <div className="image-overlay">
          <div className="content">
            <div className="info synopsis">
              <strong>Synopsis</strong> : {maxTextLength(info.overview, 200)}
              {info.overview.length > 200 && <span>...</span>}
            </div>

            <div className="info director">
              <strong>Réalisateur·ice</strong> : {director[0].name}
            </div>

            <div className="info language">
              <strong>Langue originale</strong> : {lang[info.original_language]?.name}
            </div>

            <div className="info age-limit">- {getCertifications(mockMovieReleaseDates)} ans</div>

            <div className="info tags">
              <strong>Mots clés</strong> :{" "}
              {tags.slice(0, 6).map((tag, key) => {
                const isLastTag = key + 1 === 6;
                return (
                  <span key={key}>
                    {tag}
                    {!isLastTag && ", "}
                    {isLastTag && "."}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="movie-title">
        <h3>{info.original_title}</h3>
        <div className="year">{info.release_date.match(/^\d{4}/)}</div>
      </div>
    </div>
  );
}

export default Card;
