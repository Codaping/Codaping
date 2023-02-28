import axios from "axios";
import React, { useEffect, useState } from "react";
import { Flex } from "rebass";

import { useFileMetadata } from "../../hooks/useFileMetadata";
import { SectionSubjects } from "./SectionSubjects";

export const Subject = () => {
  const [subjectsParticipant, setSubjectsParticipant] = useState<{ name: string; note: number; category: string }[]>(
    []
  );
  const [subjectsCobra, setSubjectsCobra] = useState<{ name: string; note: number; category: string }[]>([]);
  const [subjectsCamp, setSubjectsCamp] = useState<{ name: string; note: number; category: string }[]>([]);
  const [fileMetadataPartipant] = useFileMetadata("subjects/participant");
  const [fileMetadataCobra] = useFileMetadata("subjects/cobra");
  const [fileMetadataCamp] = useFileMetadata("subjects/camp");

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:3000/api/subjects/participant/getSubjectsParticipant");
      setSubjectsParticipant(res.data);
    })();
    (async () => {
      const res = await axios.get("http://localhost:3000/api/subjects/cobra/getSubjectsCobra");
      setSubjectsCobra(res.data);
    })();
    (async () => {
      const res = await axios.get("http://localhost:3000/api/subjects/camp/getSubjectsCamp");
      setSubjectsCamp(res.data);
    })();
  }, []);

  return (
    <Flex width="100%" px={80} py={60} flexDirection="column" alignItems="center">
      <SectionSubjects fileMetadata={fileMetadataPartipant} subjects={subjectsParticipant} titleSection="participant" />
      <SectionSubjects fileMetadata={fileMetadataCobra} subjects={subjectsCobra} titleSection="cobra" />
      <SectionSubjects fileMetadata={fileMetadataCamp} subjects={subjectsCamp} titleSection="camp" />
    </Flex>
  );
};
// check le hovering des Co
