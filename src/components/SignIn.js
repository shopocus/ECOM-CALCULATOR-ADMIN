import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { Hidden, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL}/image/path.svg)`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
  image: {
    backgroundImage: `url(${process.env.PUBLIC_URL}/image/banner.svg)`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
  paper: {
    borderRadius: "10px",
    margin: theme.spacing(4, 10),
    padding: theme.spacing(8, 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    padding: theme.spacing(8, 8),
  },
  avatar: {
    margin: theme.spacing(1),
    width: "50px",
    height: "50px",
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    color: "white",
    margin: theme.spacing(3, 0, 2),
  },
  t1: {
    textAlign: "left",
    font: "normal normal normal 30px/39px Righteous",
    letterSpacing: "0px",
    color: "#FFFFFF",
    opacity: "1",
  },
  t2: {
    textAlign: "right",
    font: "normal normal normal 30px/39px Righteous",
    letterSpacing: "0px",
    color: theme.palette.primary.main,
    opacity: "1",
  },
}));

export default function SignInSide(props) {
  const classes = useStyles();
  const [id, setId] = useState();
  const handleChange = (event) => {
    setId(event.target.value);
  };
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const handleClick = () => {
    fetch(process.env.REACT_APP_API_URL + "api/MPC/admin/forgetPassword", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
      .then(async function (response) {
        if (!response.ok) {
          let data = await response.json();
          throw new Error(data.message);
        }
        return response.json();
      })
      .then((data) => {
        toast.success(data.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_API_URL + "api/MPC/admin/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then(async function (response) {
        if (!response.ok) {
          let data = await response.json();
          throw new Error(data.message);
        }
        return response.json();
      })
      .then((data) => {
        toast.success(data.message);
        localStorage.setItem("token", data["x-auth"]);
        props.history.push("./dashboard");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <Grid
      container
      component="main"
      className={classes.root}
      direction="column"
      alignItems="center"
    >
      {/* <ToastContainer autoClose={2000} /> */}
      <Grid container className={classes.title}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" component="h6" className={classes.t1}>
            Ecommerce Admin Panel
          </Typography>
        </Grid>
        <Hidden smDown>
          <Grid item xs={false} sm={6}>
            <Typography variant="h5" component="h6" className={classes.t2}>
              4posper
            </Typography>
          </Grid>
        </Hidden>
      </Grid>
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="id"
                label="PIN"
                value={id}
                type="password"
                id="password"
                onChange={handleChange}
                autoComplete="off"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    color="secondary"
                    onClick={handleClick}
                  >
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Hidden smDown>
          <Grid item xs={false} md={6} className={classes.image} />
        </Hidden>
      </Grid>
    </Grid>
  );
}
