import * as ac from "./actions/actionCreators";
const axios = require("axios");
const BACKEND_URL = "https://r1chy5zeeh.execute-api.us-east-1.amazonaws.com";

// THUNKS

//All campuses
export const fetchAllCampusesThunk = () => async (dispatch) => {
  try {
    let res = await axios.get(`${BACKEND_URL}/prod/campus`);
    dispatch(ac.fetchAllCampuses(res.data.results));
  } catch (err) {
    console.error(err);
  }
};

export const addCampusThunk = (campus) => async (dispatch) => {
  try {
    let res = await axios.post(`${BACKEND_URL}/prod/campus`, campus);
    dispatch(ac.addCampus(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const deleteCampusThunk = (campusId) => async (dispatch) => {
  try {
    await axios.delete(`${BACKEND_URL}/prod/campus/${campusId}`);
    //delete succesful so change state with dispatch
    dispatch(ac.deleteCampus(campusId));
  } catch (err) {
    console.error(err);
  }
};

export const editCampusThunk = (campus) => async (dispatch) => {
  try {
    let updatedCampus = await axios.patch(
      `${BACKEND_URL}/prod/campus/${campus.id}`,
      campus
    );
    dispatch(ac.editCampus(updatedCampus));
  } catch (err) {
    console.error(err);
  }
};
//Single campus
export const fetchCampusThunk = (id) => async (dispatch) => {
  try {
    let res = await axios.get(`${BACKEND_URL}/prod/campus/${id}`);
    dispatch(ac.fetchCampus(res.data));
  } catch (err) {
    console.error(err);
  }
};

//All students
export const fetchAllStudentsThunk = () => async (dispatch) => {
  try {
    let res = await axios.get(`${BACKEND_URL}/prod/student`);
    dispatch(ac.fetchAllStudents(res.data.result));
  } catch (err) {
    console.error(err);
  }
};

export const addStudentThunk =
  ({ id, ...newStudent }) =>
  async (dispatch) => {
    try {
      let res = await axios.post(`${BACKEND_URL}/prod/student/`, newStudent);
      dispatch(ac.addStudent(res.data));
    } catch (err) {
      console.error(err);
    }
  };

export const deleteStudentThunk =
  ({ id }) =>
  async (dispatch) => {
    try {
      await axios.delete(`${BACKEND_URL}/prod/student/${id}`);
      //delete succesful so change state with dispatch
      dispatch(ac.deleteStudent(id));
    } catch (err) {
      console.error(err);
    }
  };

export const editStudentThunk =
  ({ id, ...rest }) =>
  async (dispatch) => {
    try {
      let updatedStudent = await axios.patch(
        `${BACKEND_URL}/prod/student/${id}`,
        rest
      );
      dispatch(ac.editStudent(updatedStudent));
    } catch (err) {
      console.error(err);
    }
  };

//Single student
export const fetchStudentThunk = (id) => async (dispatch) => {
  try {
    let res = await axios.get(`${BACKEND_URL}/prod/student/${id}`);
    dispatch(ac.fetchStudent(res.data));
  } catch (err) {
    console.error(err);
  }
};
