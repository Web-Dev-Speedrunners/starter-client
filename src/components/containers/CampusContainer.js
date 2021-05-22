import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk } from "../../store/thunks";
import NavBarContainer from "../containers/NavBarContainer";

import { CampusView } from "../views";

class CampusContainer extends Component {
  async componentDidMount() {
    //getting campus ID from url
    console.log("sent ", this.props.match.params);
    const a = await this.props.fetchCampus(this.props.match.params.id);
    console.log("got ", a);
  }

  render() {
    return (
      <div>
        <NavBarContainer />
        <pre>{JSON.stringify(this.state)}</pre>
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
