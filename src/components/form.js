import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Form(props) {
  const dispatch = useDispatch();
  let params = useParams();
  const classes = useStyles();
  const alert = useSelector((state) => state.alert);
  const [fields, setFields] = useState({});
  const createUI = () => {
    return alert.form.fields.map((el, i) => (
      <div key={i}>
        <TextField
          name={el}
          label={el.charAt(0).toUpperCase() + el.substr(1).toLowerCase()}
          variant="outlined"
          value={fields[el]}
          onChange={handleChange}
        />
        <br />
      </div>
    ));
  };

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(alert.form.onSubmit(fields, params.platform));
  };

  return (
    <form
      className={classes.root}
      noValidate
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      {createUI()}

      <Button type="submit" variant="contained" color="secondary">
        Submit
      </Button>
    </form>
  );
}
