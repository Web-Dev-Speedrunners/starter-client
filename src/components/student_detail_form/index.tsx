import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { CampusModel } from "../../api/campus";
import { UpdatableStudentProps, StudentModel } from "../../api/student";
import { useErrorAlert } from "../../hooks/useErrorAlert";
import useFormInput from "../../hooks/useFormInput";
import CampusItem from "../campus_item";
import StudentItem from "../student_item";
import CampusSelectFragment from "./campus_selector";

export type StudentDetailFormSubmitOnClickProps = UpdatableStudentProps;

export type StudentDetailFormProps = {
  submitButton: {
    title: string;
    onClick: (props: StudentDetailFormSubmitOnClickProps) => Promise<void>;
  };
  campus?: CampusModel;
  initialData?: StudentModel;
  handleCampusEnrollment?: (campus: CampusModel) => Promise<void>;
  handleUnenroll?: () => Promise<void>;
};

const useStyles = makeStyles({
  input: {
    margin: "12px 0",
  },
  submitButton: {
    display: "block",
    marginLeft: "auto",
  },
});

const StudentDetailForm: React.FC<StudentDetailFormProps> = ({
  initialData,
  handleCampusEnrollment,
  handleUnenroll,
  campus,
  submitButton: { title, onClick: onClickSubmit },
}) => {
  const [firstName, handleChangeFirstName] = useFormInput(
    initialData?.firstName || ""
  );
  const [lastName, handleChangeLastName] = useFormInput(
    initialData?.lastName || ""
  );
  const [imageUrl, handleChangeImageUrl] = useFormInput(
    initialData?.imageUrl || ""
  );
  const [gpa, handleChangeGpa] = useFormInput(String(initialData?.gpa || ""));
  const [email, handleChangeEmail] = useFormInput(initialData?.email || "");

  const [loading, setLoading] = useState(false);
  const [displayEnrollmentPrompt, setDisplayEnrollmentPrompt] = useState(false);

  const hideEnrollmentPrompt = () => setDisplayEnrollmentPrompt(false);

  const showError = useErrorAlert();
  const classes = useStyles();

  const gpaFloat = useMemo(() => parseFloat(gpa), [gpa]);

  const handleOnClickSubmit = async () => {
    try {
      setLoading(true);
      await onClickSubmit({
        firstName,
        lastName,
        email,
        imageUrl: imageUrl.length ? imageUrl : undefined,
        gpa: gpaFloat,
      });
    } catch (error) {
      showError(error.message || "Something went wrong");
      console.log(Object.keys(error));
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCampus = async (campus: CampusModel) => {
    if (handleCampusEnrollment) await handleCampusEnrollment(campus);
    hideEnrollmentPrompt();
  };

  const studentPreviewActions = useMemo(() => {
    if (initialData === undefined) return; // First time user
    if (campus) {
      return [
        {
          name: "Change Campus",
          onClick: async () => setDisplayEnrollmentPrompt(true),
        },
        {
          name: "Unenroll",
          onClick: async () => {
            if (handleUnenroll) await handleUnenroll();
          },
        },
      ];
    }
    // User with no Campus
    return [
      {
        name: "Set Campus",
        onClick: async () => setDisplayEnrollmentPrompt(true),
      },
    ];
  }, [campus, handleUnenroll, initialData]);

  return (
    <div>
      <CampusSelectFragment
        isOpen={displayEnrollmentPrompt}
        handleClose={hideEnrollmentPrompt}
        onCampusSelect={handleSelectCampus}
      />
      <h4>Preview</h4>
      <StudentItem
        showDetailOnClick={false}
        id={-1}
        firstName={firstName}
        lastName={lastName}
        gpa={gpaFloat}
        email={email}
        imageUrl={imageUrl}
        actions={studentPreviewActions}
      />
      {campus && (
        <div>
          <h4>Enrollment</h4>
          <CampusItem {...campus} />
        </div>
      )}
      <h4>Info</h4>
      <TextField
        variant="outlined"
        size="small"
        className={classes.input}
        fullWidth
        placeholder="First Name"
        value={firstName}
        onChange={handleChangeFirstName}
      />
      <TextField
        size="small"
        variant="outlined"
        className={classes.input}
        fullWidth
        placeholder="Last Name"
        value={lastName}
        onChange={handleChangeLastName}
      />
      <TextField
        size="small"
        variant="outlined"
        className={classes.input}
        fullWidth
        placeholder="GPA"
        value={gpa}
        onChange={handleChangeGpa}
      />
      <TextField
        size="small"
        variant="outlined"
        className={classes.input}
        fullWidth
        placeholder="Email"
        value={email}
        onChange={handleChangeEmail}
      />
      <TextField
        size="small"
        variant="outlined"
        className={classes.input}
        fullWidth
        placeholder="Image url"
        value={imageUrl}
        onChange={handleChangeImageUrl}
      />
      <Button
        disabled={loading}
        color="primary"
        className={classes.submitButton}
        variant="contained"
        onClick={handleOnClickSubmit}
      >
        {title}
      </Button>
    </div>
  );
};

export default StudentDetailForm;
