// Age certification translations US => FR
import { ageCertifications } from "../data/ageCertifications";

export const getCertifications = (movieReleaseDates) => {
  const releaseDatesFR = movieReleaseDates.results?.filter((result) => {
    return result.iso_3166_1.includes("FR");
  });

  const releaseDatesUS = movieReleaseDates.results?.filter((result) => {
    return result.iso_3166_1.includes("US");
  });

  if (!releaseDatesFR || !releaseDatesFR[0]?.release_dates) {
    if (!releaseDatesUS || !releaseDatesUS[0]?.release_dates) {
      return;
    }
  }

  const certificationFR = releaseDatesFR[0]?.release_dates[0]?.certification;
  const certificationUS = releaseDatesUS[0]?.release_dates[0]?.certification;

  if (certificationFR === "U") return;

  return certificationFR ? certificationFR : ageCertifications[certificationUS];
};

// Returns the text truncated according to the number of characters passed, but without cutting any words.
export const maxTextLength = (text, maxLength) => {
  if (text === null || text === undefined || text === "") {
    console.log("pas de valeur");
  }
  var pattern1 = "^(.{";
  var pattern2 = "}[^\\s]*).*";
  const pattern = new RegExp(pattern1 + maxLength + pattern2);
  return text.replace(pattern, "$1");
};

export function formatDate(dateString) {
  // Créer un nouvel objet Date à partir de la chaîne de caractères de la date
  var date = new Date(dateString);

  // Extraire les différentes parties de la date
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  // Définir un tableau contenant les noms des mois
  var monthNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

  // Formater les parties de la date dans le nouveau format en ajoutant des zéros supplémentaires si nécessaire
  day = day < 10 ? "0" + day : day;

  // Récupérer le nom du mois à partir du tableau en fonction de l'index du mois (mois - 1)
  var monthName = monthNames[month];

  // Retourner la date dans le nouveau format
  return `${day} ${monthName}. ${year}`;
}
