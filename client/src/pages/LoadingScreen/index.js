import React, { useState, useEffect } from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import loadingGif from "../../assets/waitingMan.gif";
import { Typography } from "@material-ui/core";
import "./index.css";

export default function LoadingScreen() {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();

  return (
    <div className={classes.root}>
      <img src={loadingGif} alt="loading..." className={classes.gif} />
      {/* <p className={classes.text}>Loading...</p> */}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    height: "100vh",
    textAlign: "center",
  },
  gif: {
    marginTop: "6%",
    marginLeft: "20%",
    width: "42%"
  },
  text: {
    fontSize: "25px",
  },
}));
