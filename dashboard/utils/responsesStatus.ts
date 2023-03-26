import type { ResponsesMessage } from "../types/responses";

export const responsesStatut = (results: ResponsesMessage, error: string, success: string) => {
  if (!results.length) {
    console.log(results[0].status);
    return error;
  }
  const typeMessage = results.find((result) => {
    result.success === false;
  });
  if (typeMessage) {
    console.log(typeMessage?.status);
    return error;
  } else return success;
};
