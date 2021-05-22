import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk } from "../../store/thunks";
import NavBarContainer from "../containers/NavBarContainer";

import { CampusView } from "../views";

class CampusContainer extends Component {
  async componentDidMount() {
    //getting campus ID from url
    await this.props.fetchCampus(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <NavBarContainer />
        <CampusView campus={this.props.campus} />
      </div>
    );
  }
}

// map state to props
const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
  };
};

export default connect(mapState, mapDispatch)(CampusContainer);
