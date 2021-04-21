import React, { useState, useEffect } from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import notFound from "../../assets/notFound.png";
import { Button } from "@material-ui/core";

export default function NotFoundPage() {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();

  return (
    <div className={classes.root}>
      <img src={notFound} alt="404 Page not found" />
      {/* <p className={classes.text}>Loading...</p> */}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#000000",
    height: "100vh",
    textAlign: "center",
  }
}));
