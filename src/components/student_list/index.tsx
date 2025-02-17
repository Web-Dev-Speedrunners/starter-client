import { makeStyles, TextField } from "@material-ui/core";
import React, { useMemo } from "react";
import { StudentModel } from "../../api/student";
import useFormInput from "../../hooks/useFormInput";
import StudentItem from "../student_item";

export type StudentListProps = {
  students: StudentModel[];
  filterable?: boolean;
  disableRedirect?: boolean;
  onClick?: (student: StudentModel) => void;
  actions?: Array<{
    name: string;
    onClick: (student: StudentModel) => Promise<void>;
  }>;
};

const useStyles = makeStyles({
  clickable: {
    cursor: "pointer",
  },
  input: {
    marginTop: "16px",
  },
});

const StudentList: React.FC<StudentListProps> = ({
  students,
  onClick,
  actions,
  filterable = false,
  disableRedirect = onClick || actions ? true : false,
}) => {
  const [searchFilter, handleChangeSearchFilter] = useFormInput("");
  const classes = useStyles();

  const filteredStudents = useMemo(
    () =>
      students.filter(
        (student) =>
          `${student.firstName} ${student.lastName}`
            .toLowerCase()
            .indexOf(searchFilter.toLowerCase()) !== -1
      ),
    [searchFilter, students]
  );

  const studentListView = useMemo(() => {
    return filteredStudents.map((student) => (
      <div
        key={student.id}
        className={onClick ? classes.clickable : ""}
        onClick={() => {
          if (onClick) onClick(student);
        }}
      >
        <StudentItem
          {...student}
          showDetailOnClick={!disableRedirect}
          actions={actions?.map((action) => ({
            name: action.name,
            onClick: async () => {
              console.log("clicked action")
              await action.onClick(student)
            }
          }))}
        />
      </div>
    ));
  }, [actions, classes.clickable, disableRedirect, filteredStudents, onClick]);

  return (
    <div>
      {filterable && (
        <TextField
          className={classes.input}
          variant="outlined"
          size="small"
          fullWidth
          placeholder={"Student Name..."}
          value={searchFilter}
          onChange={handleChangeSearchFilter}
        />
      )}
      {studentListView}
    </div>
  );
};

export default StudentList;
