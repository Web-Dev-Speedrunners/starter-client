import { Component } from "react";
import { connect } from "react-redux";
import {
  addStudentThunk,
  deleteStudentThunk,
  editStudentThunk,
  fetchStudentThunk,
} from "../../store/thunks";
import {
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
} from "reactstrap";

const ACTIONS = Object.freeze({ EDIT: 1, DELETE: 2, CREATE: 3 });

class StudentActionsController extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log("ctor props", this.props);
  }
  handleChange(buttonEvent) {
    // prevent page refresh
    buttonEvent.preventDefault();
    console.log(buttonEvent.target.name);
    this.setState({
      ...this.state,
      [buttonEvent.target.name]: buttonEvent.target.value,
    });
  }
  componentDidMount() {
    this.setState(this.props.student);
  }

  componentDidUpdate(previousProps) {
    console.log("component changed", this.props, previousProps);
    if (previousProps.student !== this.props.student) {
      this.setState(this.props.student);
    }
  }

  async handleSubmit(buttonEvent, actionType) {
    buttonEvent.preventDefault();
    let newStudent = {};
    switch (actionType) {
      case ACTIONS.EDIT:
        newStudent = await this.props.editStudent(this.state);
        break;
      case ACTIONS.CREATE:
        newStudent = await this.props.createStudent(this.state);
        break;
      case ACTIONS.DELETE:
        newStudent = await this.props.deleteStudent(this.state);
        break;
      default:
        console.error("Unexpected action");
    }
    this.setState(newStudent);
  }

  render() {
    if (this.state == null) {
      return <p>No student</p>;
    }
    return (
      <div>
        <pre>
          {JSON.stringify(this.state || "No valid student selected", null, 4)}
        </pre>
        <Form>
          <FormGroup>
            <Label for="transaction">Student Actions</Label>
            <InputGroup>
              <Input
                type="text"
                name="firstName"
                value={this.state.firstName || ""}
                onChange={this.handleChange}
              />
              <Input
                type="text"
                name="lastName"
                value={this.state.lastName || ""}
                onChange={this.handleChange}
              />
              <Input
                type="text"
                name="imageUrl"
                value={this.state.imageUrl || ""}
                onChange={this.handleChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="email"
                name="email"
                value={this.state.email || ""}
                onChange={this.handleChange}
              />
              <Input
                min={0}
                max={4}
                type="number"
                value={this.state.gpa || ""}
                name="gpa"
                onChange={this.handleChange}
                step=".01"
              />
            </InputGroup>
            <FormGroup />
            {!!this.props.create ? (
              <ButtonGroup>
                <Button
                  value="Create"
                  color="success"
                  onClick={(e) => this.handleSubmit(e, ACTIONS.CREATE)}
                >
                  Create
                </Button>
              </ButtonGroup>
            ) : (
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
  };
};

// Map dispatch to props;
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: () => dispatch(fetchStudentThunk()),
    createStudent: (student) => dispatch(addStudentThunk(student)),
    editStudent: (student) => dispatch(editStudentThunk(student)),
    deleteStudent: (student) => dispatch(deleteStudentThunk(student)),
  };
};

// Export our store-connected container by default;
export default connect(mapState, mapDispatch)(StudentActionsController);
