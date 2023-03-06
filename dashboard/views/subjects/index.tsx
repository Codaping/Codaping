import axios from "axios";
import React, { useEffect, useState } from "react";
import { Flex } from "rebass";

import { useFileMetadata } from "../../hooks/useFileMetadata";
import type { Subject as SubjectT } from "../../types/subject";
import { SectionSubjects } from "./SectionSubjects";

export const Subject = () => {
  const [subjectsParticipant, setSubjectsParticipant] = useState<SubjectT[]>([]);
  const [subjectsCobra, setSubjectsCobra] = useState<SubjectT[]>([]);
  const [subjectsCamp, setSubjectsCamp] = useState<SubjectT[]>([]);
  const [triggerRefreshData, setTriggerRefreshData] = useState(false);
  const [fileMetadataPartipant, setFileMetadataParticipant] = useFileMetadata("subjects/participant");
  const [fileMetadataCobra, setFileMetadataCobra] = useFileMetadata("subjects/cobra");
  const [fileMetadataCamp, setFileMetadataCamp] = useFileMetadata("subjects/camp");

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
    <Flex width="100%" px={[20, 50, 80]} py={60} flexDirection="column" alignItems="center">
      <SectionSubjects
        fileMetadata={fileMetadataPartipant}
        subjects={subjectsParticipant}
        updateSubject={setSubjectsParticipant}
        updatefileMetadata={setFileMetadataParticipant}
        titleSection="participant"
      />
      <SectionSubjects
        fileMetadata={fileMetadataCobra}
        subjects={subjectsCobra}
        updateSubject={setSubjectsCobra}
        updatefileMetadata={setFileMetadataCobra}
        titleSection="cobra"
      />
      <SectionSubjects
        fileMetadata={fileMetadataCamp}
        subjects={subjectsCamp}
        updateSubject={setSubjectsCamp}
        updatefileMetadata={setFileMetadataCamp}
        titleSection="camp"
      />
    </Flex>
  );
};
// check le hovering des Co des co ?
