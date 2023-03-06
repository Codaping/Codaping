import "moment/locale/fr";

import moment from "moment";

import type { Subject } from "../../../../types/subject";
import { updateSuggestionDate } from "./updateSuggestionDate";

moment.locale("fr");

export const suggestionWithNoChoiceDate = async (filteredNoChoiceDate: Subject[]) => {
  /* Get only never suggested subjects */
  const filteredNoSuggestDate = filteredNoChoiceDate.filter((subjectNotDo) => {
    if (!subjectNotDo.suggestionDate) return subjectNotDo;
  });
  if (filteredNoSuggestDate.length) return await updateSuggestionDate(filteredNoSuggestDate);
  else if (!filteredNoSuggestDate.length) {
    const filteredSuggestDate = filteredNoChoiceDate.sort((a, b) => {
      return moment(a.suggestionDate, "DD MM YYYY").unix() >= moment(b.suggestionDate, "DD MM YYYY").unix() ? 1 : -1;
    });

    console.log("suggestdate:", filteredSuggestDate);
    const mostOlderSuggestedSubjects = filteredSuggestDate.filter((date) => {
      return moment(date.suggestionDate, "DD MM YYYY").isSame(
        moment(filteredSuggestDate[0].suggestionDate, "DD MM YYYY")
      );
    });

    console.log("mostolder:", mostOlderSuggestedSubjects);
    if (mostOlderSuggestedSubjects.length === 1) {
      console.log("normalement ici, trop fort");
      return await updateSuggestionDate(mostOlderSuggestedSubjects, false);
    } else return await updateSuggestionDate(mostOlderSuggestedSubjects);
    // si plusieurs vieux random or check le plus vieux // change la date de suggest
  }
};
