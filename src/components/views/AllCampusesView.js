import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useStyles } from "../../styles/styles.js";

const AllCampusesView = ({ allCampuses }) => {
  const classes = useStyles();
  return (
    <div>
      {/* dynamic render if  */}
      {!allCampuses.length ? (
        <div>There are no campuses.</div>
      ) : (
        allCampuses.map((campus) => (
          <div className={classes.placeholderContent} key={campus.id}>
            <Link to={`/campus/${campus.id}`}>
              <h1>{campus.name}</h1>
            </Link>
            <p>{campus.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
