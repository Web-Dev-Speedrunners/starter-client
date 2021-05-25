import { LinearProgress, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import StudentService, { StudentModel } from "../../api/student";
import NavbarLayout from "../../components/layout/navbar_layout";
import StudentDetailForm, {
  StudentDetailFormSubmitOnClickProps,
} from "../../components/student_detail_form";
import { useErrorAlert } from "../../hooks/useErrorAlert";
import { editStudent } from "../../store/actions/actionCreators";
import useDeleteStudent from "../../hooks/useDeleteStudent";
import useGetStudentsCampus from "../../hooks/useGetStudentsCampus";
import { CampusModel } from "../../api/campus";
import useEnrollStudent from "../../hooks/useEnrollStudent";
import useUnenrollStudent from "../../hooks/useUnenrollStudent";

const useStyles = makeStyles({
  content: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "60vw",
  },
});

const StudentDetailPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const studentId = parseInt(id, 10);
  const [initialStudent, setInitialStudent] = useState<StudentModel>();
  const [studentsCampus, setStudentsCampus] = useState<CampusModel>();
  const { enroll } = useEnrollStudent();
  const { unenroll } = useUnenrollStudent();
  const showError = useErrorAlert();
  const { getStudentsCampus } = useGetStudentsCampus();

  const { deleteStudent } = useDeleteStudent();

  useEffect(() => {
    const fetchStudentsCampus = async () => {
      try {
        const result = await getStudentsCampus(studentId);
        setStudentsCampus(result);
      } catch (error) {
        showError(error.message);
      }
    };

    const fetchStudentDetail = async () => {
      try {
        const student = await StudentService.FindById(studentId);
        setInitialStudent(student);
      } catch (error) {
        showError(error.message);
        history.push("/students");
      }
    };

    fetchStudentDetail();
    fetchStudentsCampus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  const handleUpdateStudent = async (
    data: StudentDetailFormSubmitOnClickProps
  ) => {
    try {
      await StudentService.Update(studentId, data);
      const student: StudentModel = {
        id: studentId,
        imageUrl: data.imageUrl!,
        ...data,
      };
      dispatch(editStudent(student));
      history.push("/students");
    } catch (error) {
      showError(error.message);
    }
  };

  const handleDeleteStudent = async (studentId: number) => {
    await deleteStudent(studentId);
    history.goBack();
  };

  const handleCampusEnrollment = async (campus: CampusModel) => {
    if (initialStudent === undefined) {
      // Impossible state
      return;
    }
    try {
      await enroll(initialStudent.id, campus.id);
      setStudentsCampus(campus);
    } catch (error) {
      showError(error.message);
    }
  };

  const handleUnenroll = async () => {
    try {
      await unenroll(studentId);
      setStudentsCampus(undefined)
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <NavbarLayout
      container
      actionButton={{
        name: "Delete",
        onClick: () => handleDeleteStudent(studentId),
      }}
    >
      <div className={classes.content}>
        {initialStudent === undefined && <LinearProgress />}
        {initialStudent && (
          <StudentDetailForm
            initialData={initialStudent}
            campus={studentsCampus}
            handleCampusEnrollment={handleCampusEnrollment}
            handleUnenroll={handleUnenroll}
            submitButton={{
              title: "Save",
              onClick: handleUpdateStudent,
            }}
          />
        )}
      </div>
    </NavbarLayout>
  );
};

export default StudentDetailPage;
