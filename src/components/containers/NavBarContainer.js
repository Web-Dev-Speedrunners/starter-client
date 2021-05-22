import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    fontType: "bold",
    fontFamily: "Courier, sans-serif",
    fontSize: "35px",
    color: "#CDDC39",
  },
  appBar: {
    backgroundColor: "#11153e",
    shadows: ["none"],
  },
  greeting: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    width: "50%",
    margin: "auto",
  },
  links: {
    textDecoration: "none",
  },
}));

const LinkButton = ({ to, label }) => {
  const classes = useStyles();
  return (
    <Link className={classes.links} to={to}>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "10px" }}
      >
        {label}
      </Button>
    </Link>
  );
};

const NavBarContainer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            CRUD App
          </Typography>
          <LinkButton to={"/campuses"} label={"All Campuses"}/>
          <LinkButton to={"/students"} label={"All Students"}/>
          <LinkButton to={"/home_page"} label={"Home Page"}/>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBarContainer;
