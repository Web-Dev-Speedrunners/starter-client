import React, { useState, useEffect } from "react";
import APIRequest from "../../api/request";
import { makeStyles } from "@material-ui/core/";
import Navbar from "../../components/navbar";
import campus_image from "../../assets/image/campus.jpg";
import { Container, Grid, Typography } from "@material-ui/core";
import StudentItem from "../../components/student_item";
import CampusItem from "../../components/campus_item";

const useStyles = makeStyles({
  pageContainer: {
    backgroundImage: `url(${campus_image})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "95vh",
    border: "1px solid",
  },
  container: {
    backgroundColor: "#ffffffcc",
    minHeight: "15em",
    borderRadius: "2em",
    border: "2px solid",
    textAlign: "center",
    paddingTop: "2em",
    paddingBottom: "2em",
  },
  content: {
    // display: 'flex',
    // justifyContent: 'center',
    width: "65em",
    margin: "auto",
    marginTop: "15em",
  },
  links: {
    textDecoration: "none",
  },
  bottomSpacing: {
    marginBottom: "10px",
  },
  items: {
    // margin: '0 6px 4px 6px',
    padding: "0 10px 4px 10px",
  },
  center: {
    margin: "auto",
  },
});

const HomePage = () => {
  const classes = useStyles();
  const [recentStudents, setRecentStudents] = useState([]);
  const [recentCampuses, setRecentCampuses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const studentResults = await APIRequest.Get("/student/recent?limit=3");
      setRecentStudents(studentResults.results);
      const campusResults = await APIRequest.Get("/campus/recent?limit=3");
      setRecentCampuses(campusResults.results);
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      {console.log(recentStudents, recentCampuses)}
      <div className={classes.pageContainer}>
        {/* Content Container for margins*/}
        <div className={classes.content}>
          {/* Actual content */}
          <Container className={classes.container}>
            <Grid container className={classes.center}>
              <Grid className={classes.bottomSpacing}>
                <Typography variant="h5" className={classes.bottomSpacing}>
                  Campus Solution
                </Typography>
                <Typography variant="body2" className={classes.bottomSpacing}>
                  Welcome to Team WebDev Speedrunner's Campus Solution :) Feel
                  free to browse as long as you like. Checkout our{" "}
                  <a
                    href="https://github.com/Web-Dev-Speedrunners"
                    target="_blank"
                  >
                    repo on github!
                  </a>{" "}
                  :))
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.items}>
                <Typography variant="h6" className={classes.bottomSpacing}>
                  New Campuses
                </Typography>
                {recentCampuses.length ? (
                  recentCampuses.map((campus, key) => (
                    <CampusItem key={key} {...campus} displayDesc={false} />
                  ))
                ) : (
                  <>No Results</>
                )}
              </Grid>
              <Grid item xs={6} className={classes.items}>
                <Typography variant="h6" className={classes.bottomSpacing}>
                  New Students
                </Typography>
                {recentStudents.length !== 0 ? (
                  recentStudents.map((student, key) => {
                    return (
                      <StudentItem key={key} {...student} displayDesc={false} />
                    );
                  })
                ) : (
                  <>No Results</>
                )}
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
};

export default HomePage;
