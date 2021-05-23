import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import NavBarContainer from '../containers/NavBarContainer';
import campus_image from './image/campus.jpg';
import { Container, Grid, Typography } from '@material-ui/core';
import allCampuses from '../../store/reducers/campuses';

// import studentItem from '../student_item';
// import { fetchRecentStudentsThunk } from '../../store/thunks';
import StudentView from '../views/StudentView';
import CampusView from '../views/CampusView';

const useStyles = makeStyles({
  pageContainer: {
    backgroundImage: `url(${campus_image})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '90vh',
    border: '1px solid',
  },
  container: {
    backgroundColor: '#ffffffcc',
    minHeight: '15em',
    borderRadius: '2em',
    border: '2px solid',
    textAlign: 'center',
    paddingTop: '2em',
    paddingBottom: '2em',
  },
  content: {
    // display: 'flex',
    // justifyContent: 'center',
    width: '65em',
    margin: 'auto',
    marginTop: '15em',
  },
  links: {
    textDecoration: 'none',
  },
  bottomSpacing: {
    marginBottom: '10px',
  },
});

const HomePageView = (props) => {
  const classes = useStyles();
  // const [recentStudents, setRecentStudents] = useState([]);
  // const [recentCampuses, setRecentCampuses] = useState([]);

  // useEffect(() => {
  //   console.log(this);
  //   // this.props.fetchRecentStudents();
  // }, []);

  const { recentStudents, recentCampuses } = props;

  return (
    <>
      {console.log(
        'recentStudents',
        recentStudents,
        'recentCampus',
        recentCampuses
      )}
      <NavBarContainer />

      <div className={classes.pageContainer}>
        {/* Content Container for margins*/}
        <div className={classes.content}>
          {/* Actual content */}
          <Container className={classes.container}>
            <Grid container>
              <Grid item xs={12} className={classes.bottomSpacing}>
                <Typography variant="h5" className={classes.bottomSpacing}>
                  Catchy Tagline
                </Typography>
                <Typography variant="body2" className={classes.bottomSpacing}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean ultrices justo non erat faucibus, at vehicula ante
                  maximus. Proin sem velit, pulvinar ac elementum ut, molestie
                  sed velit. Nunc ultricies volutpat molestie. Morbi mattis nisl
                  ante, eget rhoncus mauris euismod ac. Duis blandit sem vitae
                  dui faucibus lobortis. Nullam vel nunc rhoncus, gravida enim
                  ac, vestibulum ex. Donec eu sapien in augue congue gravida nec
                  a ligula.
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography variant="h6" className={classes.bottomSpacing}>
                  New Campuses
                </Typography>
                {recentCampuses &&
                recentCampuses.data &&
                recentCampuses.data.results ? (
                  recentCampuses.data.results.map((campus) => (
                    <CampusView campus={campus} />
                  ))
                ) : (
                  <></>
                )}
              </Grid>
              <Grid xs={6}>
                <Typography variant="h6" className={classes.bottomSpacing}>
                  New Students
                </Typography>
                {recentStudents &&
                recentStudents.data &&
                recentStudents.data.results ? (
                  recentStudents.data.results.map((student) => {
                    return <StudentView student={student} />;
                  })
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
};

// const mapState = (state) => {
//   return {
//     recentStudents: state.recentStudents,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     fetchRecentStudents: () => dispatch(fetchRecentStudentsThunk()),
//   };
// };

// export default connect(mapState, mapDispatch)(HomePageView);

export default HomePageView;

// const mapStateToProps = (state) => {
//   const { allStudents, AllCampuses } = state;
//   console.log(allStudents, allCampuses);
//   return { recentStudents: allStudents, recentCampuses: AllCampuses };
// };

// export default connect(mapStateToProps)(HomePageView);
