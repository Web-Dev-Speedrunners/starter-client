import { makeStyles, Button } from "@material-ui/core";
import React, { useMemo } from "react";
import { StudentModel } from "../../api/student";
import { Link } from "react-router-dom";
import PictureCard from "../picture_card";

export type ActionItem = {
  name: string,
  onClick: (props?: any) => Promise<void>,
}

export interface StudentItemProps extends StudentModel {
  showDetailOnClick?: boolean;
  displayDesc?: boolean;
  actions?: Array<ActionItem>;
}

const useStyles = makeStyles({
  clickable: {
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      color: "inherit",
    },
  },
  name: {
    fontSize: "32px",
    fontWeight: 500,
  },
  detail: {
    fontSize: "18px",
    fontWeight: 300,
  },
  actionButton: {
    marginRight: "12px"
  }
});

const StudentItem: React.FC<StudentItemProps> = ({
  id,
  firstName,
  lastName,
  gpa,
  email,
  imageUrl,
  showDetailOnClick = true,
  displayDesc = true,
  actions = [],
}) => {
  const classes = useStyles();


  const detailView = useMemo(() => {
    return (
      <PictureCard imageUrl={imageUrl}>
        <h2 className={classes.name}>
          {firstName} {lastName}
        </h2>
        {displayDesc ? 
          <>
            <h5 className={classes.detail}>{email}</h5>
            <h5 className={classes.detail}>GPA: {gpa}</h5>
          </> :
          <></>
        }
        

        {actions.map((action, key) => <Button onClick={action.onClick} key={key} className={classes.actionButton} variant="contained" color="primary"> {action.name} </Button>)}
      </PictureCard>
    );
  }, [firstName, lastName, email, gpa, classes.detail, classes.name, classes.actionButton, imageUrl, actions, displayDesc]);

  return (
    <div>
      {showDetailOnClick ? (
        <Link className={classes.clickable} to={"/student/" + id}>
          {detailView}
        </Link>
      ) : (
        detailView
      )}
    </div>
  );
};

export default StudentItem;
