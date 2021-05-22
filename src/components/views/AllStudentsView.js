import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NavBarContainer from "../containers/NavBarContainer";
import { useStyles } from "../../styles/styles.js";

const AllStudentsView = ({ allStudents }) => {
  const classes = useStyles();

  return (
    <div>
      <NavBarContainer />
      {/* msg if no students else diplay all students */}
      {!allStudents.length ? (
        <div>There are no students.</div>
      ) : (
        allStudents.map(({ id, firstName, lastName, email, gpa }) => (
          <div className={classes.placeholderContent} key={id}>
            <Link to={`/student/${id}`}>
              <h1>
                {firstName} {lastName}
              </h1>
            </Link>
            <p>
              {email} gpa{gpa}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

AllStudentsView.propTypes = {
  allStudents: PropTypes.array.isRequired,
};

export default AllStudentsView;
