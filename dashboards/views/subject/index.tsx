import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Box } from "rebass";

import { SubjectCard } from "../../components/Card/SubjectCard";
import { AddSubject } from "../../components/Card/SubjectCard/AddSubject";

const RenderPdf = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Document file="/pdf/jack.pdf" onLoadSuccess={({ numPages }) => onDocumentLoadSuccess({ numPages })}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

export const Subject = () => {
  return (
    <Box
      width="100%"
      padding={80}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 280px)",
        justifyContent: "center",
        gap: "30px"
      }}
    >
      <SubjectCard
        onClick={() => {
          null;
        }}
      />
      <AddSubject />
    </Box>
  );
};
