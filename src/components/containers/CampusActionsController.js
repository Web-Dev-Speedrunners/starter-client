import { Component } from "react";
import { connect } from "react-redux";
import {
  addCampusThunk,
  deleteCampusThunk,
  editCampusThunk,
  fetchCampusThunk,
} from "../../store/thunks";
import { Button, ButtonGroup, Form, FormGroup, Input, Label } from "reactstrap";

const ACTIONS = Object.freeze({ EDIT: 1, DELETE: 2, CREATE: 3 });

class CampusActionController extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(buttonEvent) {
    // prevent page refresh
    buttonEvent.preventDefault();
    this.setState({
      ...this.state,
      [buttonEvent.target.name]: buttonEvent.target.value,
    });
  }
  componentDidMount() {
    if (this.props.campus !== undefined && !!this.props.create) {
      this.setState(this.props.campus);
    }
  }
  componentDidUpdate(previousProps) {
    console.log(this.props, previousProps);
    if (previousProps.create !== this.props.create) {
      this.setState({});
    } else if (previousProps.campus !== this.props.campus) {
      this.setState(this.props.campus);
    }
  }

  async handleSubmit(buttonEvent, actionType) {
    buttonEvent.preventDefault();
    let newCampus = {};
    switch (actionType) {
      case ACTIONS.EDIT:
        newCampus = await this.props.editCampus(this.state);
        break;
      case ACTIONS.CREATE:
        newCampus = await this.props.createCampus(this.state);
        break;
      case ACTIONS.DELETE:
        newCampus = await this.props.deleteCampus(this.state.id);
        break;
      default:
        console.error("Unexpected action");
    }
    this.setState(newCampus);
  }

  render() {
    return (
      <div>
        {/* remove when not useful*/}
        <pre>Debug: {JSON.stringify(this.state, null, 4)}</pre>
        <Label for="transaction">Campus Actions</Label>
        <Form>
          <FormGroup>
            <p>Id: {this.state?.id}</p>
            <Input
              type="text"
              name="name"
              value={this.state?.name || "Campus Name"}
              onChange={this.handleChange}
            />
            <Input
              type="text"
              name="address"
              value={this.state?.address || "Campus Address"}
              onChange={this.handleChange}
            />
            <Input
              type="text"
              name="imageUrl"
              value={this.state?.imageUrl || "Image URL"}
              onChange={this.handleChange}
            />
            <Input
              type="text"
              name="description"
              value={this.state?.description || "Description"}
              onChange={this.handleChange}
            />
            {/* show buttons based on what we have on state */}
            {!!this.props.create ? (
              <ButtonGroup>
                <Button
                  color="primary"
                  onClick={(e) => this.handleSubmit(e, ACTIONS.EDIT)}
                >
                  Edit
                </Button>
                <Button
                  value="Delete"
                  color="danger"
                  onClick={(e) => this.handleSubmit(e, ACTIONS.DELETE)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup>
                <Button
                  value="Create"
                  color="success"
                  onClick={(e) => this.handleSubmit(e, ACTIONS.CREATE)}
                >
                  Create
                </Button>
              </ButtonGroup>
            )}
          </FormGroup>
        </Form>
      </div>
    );
  }
}

// Map state to props;
const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

// Map dispatch to props;
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: () => dispatch(fetchCampusThunk()),
    createCampus: (campus) => dispatch(addCampusThunk(campus)),
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
    deleteCampus: (campus) => dispatch(deleteCampusThunk(campus)),
  };
};

// Export our store-connected container by default;
export default connect(mapState, mapDispatch)(CampusActionController);
