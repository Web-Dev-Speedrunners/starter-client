import { Grid, LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CampusModel } from "../../api/campus";
import { StudentModel } from "../../api/student";
import NavbarLayout from "../../components/layout/navbar_layout";
import { useErrorAlert } from "../../hooks/useErrorAlert";
import useGetCampusById from "../../hooks/useGetCampusById";
import useGetCampusStudents from "../../hooks/useGetCampusStudents";
import CampusDetailBannerFragment from "./banner";
import CampusDescriptionFragment from "./description";

const CampusDetailPage: React.FC = () => {
  const [campus, setCampus] = useState<CampusModel>();
  const { findCampus, loading: loadingCampus } = useGetCampusById();
  const [students, setStudents] = useState<StudentModel[]>();
  const { getCampusStudents, loading: loadingStudents } =
    useGetCampusStudents();
  const { id: campusId } = useParams<{ id: string }>();
  const showError = useErrorAlert();

  useEffect(() => {
    const fetchCampus = async () => {
      try {
        const campus = await findCampus(parseInt(campusId, 10));
        setCampus(campus);
      } catch (error) {
        showError(error.message);
      }
    };

    const fetchStudents = async () => {
      try {
        const result = await getCampusStudents(parseInt(campusId, 10));
        setStudents(result);
      } catch (error) {
        showError(error.message);
      }
    };
    fetchCampus();
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campusId]);

  console.log(students);

  const handleClickEnroll = () => {
    console.log("Enroll selected");
  };

  return (
    <NavbarLayout
      container
      actionButton={{
        name: "Enroll",
        onClick: handleClickEnroll,
      }}
    >
      {(loadingCampus || loadingStudents) && <LinearProgress />}
      <h1>Campus Detail Page</h1>
      {campus && (
        <Grid container spacing={4}>
          <Grid item xs={9}>
            <CampusDescriptionFragment text={campus.description} />
          </Grid>
          <Grid item xs={3}>
            <CampusDetailBannerFragment
              id={campus.id}
              name={campus.name}
              address={campus.address}
              imageUrl={campus.imageUrl}
            />
          </Grid>
        </Grid>
      )}
    </NavbarLayout>
  );
};

export default CampusDetailPage;
