import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import Loader from "@mui/material/CircularProgress";
import { Input, Label } from "@rebass/forms";
import axios from "axios";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { Flex, Text } from "rebass";

import { ocrProcess } from "./constants";

export type LoadingFileT = {
  value: boolean;
  type?: "upload" | "check" | "waitCheck" | "success";
};

interface DragAndDropSection {
  description?: string;
  url?: string | ArrayBuffer;
  handleParse: (arr: string[]) => void;
  setUrl?: Dispatch<SetStateAction<string | ArrayBuffer>>;
}

export const DragAndDropSection = ({ ...props }) => {
  const [ocrResult, setOcrResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const [loadingFile, setLoadingFile] = useState<LoadingFileT>({
    value: false
  });

  const ocr = async (url: string | ArrayBuffer) => {
    setOcrResult(
      (
        await axios.post(
          `https://content-vision.googleapis.com/v1/images:annotate?&key=${process.env.API_KEY_VISION}`,
          {
            requests: [
              {
                image: {
                  content: (url as string).replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
                },
                features: [
                  {
                    maxResults: 0,
                    type: "TEXT_DETECTION"
                  }
                ]
              }
            ]
          }
        )
      ).data
    );
    setLoading(false);
  };

  const getBase64 = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        if (!reader.result) return;

        if (file.type === "application/pdf") props.setUrl(reader.result);
        else if (/^image\/(jpeg|jpg|png|tiff|webp)$/i.test(file.type)) ocr(reader.result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
        setLoading(false);
      };
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setLoadingFile({ value: true, type: "upload" });
    getBase64(e.target.files ? e.target.files[0] : null);
  };

  useEffect(() => {
    if (!ocrResult) return;
    if (ocrResult?.responses[0]?.error) {
      setLoadingFile({ value: false, type: "waitCheck" });
      return props.setError("Une erreur est survenue, veillez réessayer.");
    }
    if (!ocrProcess(ocrResult, props.handleParse, props.setError, setLoadingFile)) return;
    setLoading(false);
  }, [ocrResult]);

  return (
    <Flex
      height={250}
      width={340}
      bg="#928490"
      marginTop={30}
      padding={20}
      sx={{
        border: "dashed 1px ",
        borderColor: "var(--blue)",
        position: "relative",
        animation: "fadeIn .5s",
        "@keyframes fadeIn": {
          from: {
            opacity: 0
          },
          to: {
            opacity: 1
          }
        }
      }}
      flexDirection="column"
      alignItems="center"
    >
      <FolderOpenIcon sx={{ color: "var(--beige)", fontSize: 90 }} />
      <Text as="p" color="var(--lightBeige)">
        {props.description}
      </Text>
      <Text as="p" color="var(--beige)" paddingY={10}>
        OR
      </Text>
      <Label htmlFor="browse-file" display="flex" justifyContent="center">
        <Text
          color="var(--blue)"
          height={40}
          width={100}
          bg="var(--beige)"
          alignItems="center"
          justifyContent="center"
          display="flex"
          sx={{ borderColor: "var(--beige)", ":hover": { transform: "scale(1.05)", transitionDuration: "100ms" } }}
        >
          {loading ? <Loader size={20} sx={{ color: "black" }} /> : "Browse file"}
        </Text>
      </Label>
      <Input
        id="browse-file"
        name="browse-file"
        type="file"
        height={250}
        width={340}
        sx={{ position: "absolute", top: 0, opacity: 0 }}
        onChange={handleChange}
      />
    </Flex>
  );
};
