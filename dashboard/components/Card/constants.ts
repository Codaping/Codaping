import { splitString } from "../../utils/split";

type OcrResult = {
  responses: {
    fullTextAnnotation: {
      text: string;
    };
  }[];
};

export const ocrProcess = (
  json: OcrResult,
  handleParse: (arr: string[]) => void,
  setError: any,
  setLoadingFile: any
) => {
  if (json.responses[0].fullTextAnnotation.text) {
    const text = json.responses[0].fullTextAnnotation.text;

    handleParse(splitString(text));
  } else {
    setError("Votre carte étudiante ne correspond pas à celle d'une école du groupe IONIS.");
    setLoadingFile({ value: false });
    return false;
  }

  setLoadingFile({ value: false, type: "success" });
  return true;
};
