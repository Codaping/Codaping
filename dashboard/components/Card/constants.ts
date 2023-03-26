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
  onValidate: () => void
) => {
  if (json.responses[0].fullTextAnnotation.text) {
    const text = json.responses[0].fullTextAnnotation.text;

    handleParse(splitString(text));
    onValidate();
  } else {
    setError("There is a problem in your photo");
    return false;
  }
  return true;
};
