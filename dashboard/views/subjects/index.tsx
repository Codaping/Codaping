import axios from "axios";
import React, { useEffect, useState } from "react";
import { Flex } from "rebass";

import { useFileMetadata } from "../../hooks/useFileMetadata";
import type { FileMetadata } from "../../types/file";
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
        updateSubject={(category: any, v: (s: any) => any) =>
          category === "participant"
            ? setSubjectsParticipant((s) => v(s))
            : category === "camp"
            ? setSubjectsCamp((s) => v(s))
            : setSubjectsCobra((s) => v(s))
        }
        updatefileMetadata={(category: any, v: (s: FileMetadata[] | undefined) => FileMetadata[]) =>
          category === "participant"
            ? setFileMetadataParticipant((s) => v(s))
            : category === "camp"
            ? setFileMetadataCamp((s) => v(s))
            : setFileMetadataCobra((s) => v(s))
        }
        titleSection="participant"
      />
      {subjectsCobra?.length ? (
        <SectionSubjects
          fileMetadata={fileMetadataCobra}
          subjects={subjectsCobra}
          updateSubject={(_: any, v: (s: any) => any) => setSubjectsCobra((s) => v(s))}
          updatefileMetadata={(_: any, v: (s: FileMetadata[] | undefined) => FileMetadata[]) =>
            setFileMetadataCobra((s) => v(s))
          }
          titleSection="cobra"
        />
      ) : null}
      {subjectsCamp?.length ? (
        <SectionSubjects
          fileMetadata={fileMetadataCamp}
          subjects={subjectsCamp}
          updateSubject={(_: any, v: (s: any) => any) => setSubjectsCamp((s) => v(s))}
          updatefileMetadata={(_: any, v: (s: FileMetadata[] | undefined) => FileMetadata[]) =>
            setFileMetadataCamp((s) => v(s))
          }
          titleSection="camp"
        />
      ) : null}
    </Flex>
  );
};
