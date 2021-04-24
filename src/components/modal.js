import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { removeAlert } from "../actions/alert";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import Form from "./form";
import { Grid, Paper } from "@material-ui/core";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  const handleClose = () => {
    dispatch(removeAlert());
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={alert.set}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={alert.set}>
          <div className={classes.paper}>
            { alert.type === "form" ? <div>
              <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' onClick={handleClose} alt="close" style={{cursor:'pointer', float:'right', marginTop: '2px', width: '20px'}}/>
              <h2 id="transition-modal-title">
              {alert.form.type + " " + alert.form.page}
            </h2>
            <p id="transition-modal-description">
              <Form action={alert.form.type} product={alert.form.page} />            
            </p>
            </div> :<></>}
            { alert.type === "calculation" ? <div>
            <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' onClick={handleClose} alt="close" style={{cursor:'pointer', float:'right', marginTop: '2px', width: '20px'}}/>
            <h2 style={{textAlign:"center"}} id="transition-modal-title">
              {alert.calculation.title} : {alert.calculation.date}
            </h2>
            <p id="transition-modal-description">
              <Grid container spacing={5}>
                <Grid item col={6}>
                  <h4 style={{width:"15rem"}}>INPUT</h4>
                  <Paper style={{ maxWidth: 400, maxHeight:400, overflow: 'auto', padding: "0rem 2rem"}}>
                    <pre>{JSON.stringify(alert.calculation.input, undefined, 2)}</pre>
                  </Paper>
                </Grid>
                <Grid item col={6}>
                  <h4 style={{width:"15rem"}}>OUTPUT</h4>
                    <Paper style={{ maxWidth: 400, maxHeight:400, overflow: 'auto' , padding: "0rem 2rem"}}>
                        <pre>{JSON.stringify(alert.calculation.output, undefined, 2)}</pre>
                    </Paper>
                  </Grid>
              </Grid> 
              </p>
            </div> :<></>}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
