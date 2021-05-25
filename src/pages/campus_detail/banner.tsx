import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export type CampusDetailBannerFragmentProps = {
  id: number,
  name: string;
  address: string;
  imageUrl: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    padding: "36px",
    backgroundColor: theme.palette.secondary.main
  },
  image: {
    borderRadius: "50%",
    width: "144px",
    height: "144px",
  },
  name: {
    fontWeight: "bold",
    fontSize: "32x",
    margin: "24px 0 0 0",
  },
  address: {
    fontWeight: 300
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "none",
      color: "inherit",
    }
  },
  button: {
    marginTop: "24px",
    paddingLeft: "36px",
    paddingRight: "36px"
  }
}));

const CampusDetailBannerFragment: React.FC<CampusDetailBannerFragmentProps> = ({
  id,
  name,
  address,
  imageUrl,
}) => {
  const classes = useStyles();
  return (
    <Paper variant="elevation" elevation={4} className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <img className={classes.image} src={imageUrl} />
        <h2 className={classes.name}>{name}</h2>
        <h5 className={classes.address}>{address}</h5>
        <Link className={classes.link} to={`/campus/${id}/edit`}><Button className={classes.button} color="primary" variant="contained">Modify</Button></Link>
      </Grid>
    </Paper>
  );
};

export default CampusDetailBannerFragment;
