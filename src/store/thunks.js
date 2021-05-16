import * as ac from "./actions/actionCreators";
const axios = require("axios");

// THUNKS

//All campuses
export const fetchAllCampusesThunk = () => async (dispatch) => {
  try {
    let res = await axios.get(`/prod/campus`);
    dispatch(ac.fetchAllCampuses(res.data.results));
  } catch (err) {
    console.error(err);
  }
};

export const addCampusThunk = (campus) => async (dispatch) => {
  try {
    let res = await axios.post(`/prod/campus`, campus);
    dispatch(ac.addCampus(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const deleteCampusThunk = (campusId) => async (dispatch) => {
  try {
    await axios.delete(`/prod/campus/${campusId}`);
    //delete succesful so change state with dispatch
    dispatch(ac.deleteCampus(campusId));
  } catch (err) {
    console.error(err);
  }
};

export const editCampusThunk = (campus) => async (dispatch) => {
  try {
    let updatedCampus = await axios.put(
      `/prod/campus/${campus.id}`,
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
    let res = await axios.get(`/prod/campus/${id}`);
    console.log(res.data);
    dispatch(ac.fetchCampus(res.data));
  } catch (err) {
    console.error(err);
  }
};

//All students
export const fetchAllStudentsThunk = () => async (dispatch) => {
  try {
    let res = await axios.get(`/prod/student`);
    dispatch(ac.fetchAllStudents(res.data.result));
  } catch (err) {
    console.error(err);
  }
};

export const addStudentThunk = ({id, ...newStudent}) => async (dispatch) => {
  try {
    let res = await axios.post(`/prod/student/`, newStudent);
    dispatch(ac.addStudent(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const deleteStudentThunk = (studentId) => async (dispatch) => {
  try {
    await axios.delete(`/prod/student/${studentId}`);
    //delete succesful so change state with dispatch
    dispatch(ac.deleteStudent(studentId));
  } catch (err) {
    console.error(err);
  }
};

export const editStudentThunk = ({id, ...rest}) => async (dispatch) => {
  try {
    console.log("Edit student", rest)
    let updatedStudent = await axios.patch(
      `/prod/student/${id}`,
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
    let res = await axios.get(`/prod/student/${id}`);
    dispatch(ac.fetchStudent(res.data));
  } catch (err) {
    console.error(err);
  }
};
