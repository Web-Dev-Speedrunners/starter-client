import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAllStudentsThunk } from "../../store/thunks";
import { AllStudentsView } from "../views";
import StudentActionsController from "./StudentActionsController";

const defaultStudent = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email Address",
  gpa: 1,
  imageUrl: "url",
};

class AllStudentsContainer extends Component {
  componentDidMount() {
    this.props.fetchAllStudents();
  }

  render() {
    console.log(defaultStudent);
    return (
      <div>
        <AllStudentsView allStudents={this.props.allStudents} />;
        <StudentActionsController student={defaultStudent} create />
      </div>
    );
  }
}

// Map state to props;
const mapState = (state) => {
  return {
    allStudents: state.allStudents,
  };
};

// Map dispatch to props;
const mapDispatch = (dispatch) => {
  return {
    fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
  };
};

// Type check props;
AllStudentsContainer.propTypes = {
  allStudents: PropTypes.array.isRequired,
  fetchAllStudents: PropTypes.func.isRequired,
};

// Export our store-connected container by default;
export default connect(mapState, mapDispatch)(AllStudentsContainer);
