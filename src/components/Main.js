import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 280,
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
  },
  img: {
    height: "-webkit-fill-available",
    width: "-webkit-fill-available",
  },
  img1: {
    height: "-webkit-fill-available",
    width: "70%",
  },
}));


export default function Main(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [count, setCount] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        var response = await fetch(
          process.env.REACT_APP_API_URL +
          "api/users/admin/dashboard",
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              "x-auth": localStorage.getItem("token"),
            },
          }
        )
        const json = await response.json();
        setCount(json)
      } catch (error) {
        toast.error(error.message);
      }

    }
    fetchData()
  }, []);

  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justify="center"
      alignItems="center"
    >
      {/* Recent Deposits */}
      {count.map(e => (<Grid key={e.platform} item xs={12} md={3} lg={3}>
        <Paper className={fixedHeightPaper}>
          {" "}
          <img
            className={classes.img1}
            src={`${process.env.PUBLIC_URL}/image/${e.platform}.svg`}
            alt="meesho"
          />
          <Typography variant="h6" >
            Calculate Count : {e.calculate_count}
          </Typography>
          <Typography variant="h6" >
            Save Count : {e.save_count}
          </Typography>
        </Paper>
      </Grid>)
      )}
    </Grid>
  );
}
