import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAllCampusesThunk } from "../../store/thunks";
import AllCampusesView from "./AllCampusesView";
import CampusActionsController from "../../components/campus_action_controller";
import Navbar from "../../components/navbar";

class AllCampusesContainer extends Component {
  componentDidMount() {
    this.props.fetchAllCampuses();
  }

  render() {
    return (
      <div>
        <Navbar />
        <AllCampusesView allCampuses={this.props.allCampuses} />;
        <CampusActionsController create={false} />
      </div>
    );
  }
}

// Map state to props;
const mapState = (state) => {
  return {
    allCampuses: state.allCampuses,
  };
};

// Map dispatch to props;
const mapDispatch = (dispatch) => {
  return {
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
  };
};

// Type check props;
AllCampusesContainer.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  fetchAllCampuses: PropTypes.func.isRequired,
};

// Export our store-connected container by default;
export default connect(mapState, mapDispatch)(AllCampusesContainer);
