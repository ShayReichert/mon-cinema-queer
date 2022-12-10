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

  return certificationFR ? certificationFR : ageCertifications[certificationUS];
};

// Returns the text truncated according to the number of characters passed, but without cutting any words.
export const maxTextLength = (text, maxLength) => {
  var pattern1 = "^(.{";
  var pattern2 = "}[^\\s]*).*";
  const pattern = new RegExp(pattern1 + maxLength + pattern2);
  return text.replace(pattern, "$1");
};
