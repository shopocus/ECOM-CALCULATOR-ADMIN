import { toast } from "react-toastify";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (set, type, details) => (dispatch) => {
  if(type==="form"){
    dispatch({
      type: SET_ALERT,
      payload: { set, type , form : details },
    });
  }
  if(type==="calculation"){
    console.log(details.platform)
    fetch( process.env.REACT_APP_API_URL +"api/users/admin/show/saved/title/data?company="+details.platform+"&email="+details.email+"&role=Admin&title="+ details.title , {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-auth": localStorage.getItem("token"),
      }
    })
      .then(async function (response) {
        if (!response.ok && parseInt(response.status) !== 401) {
          let data = await response.json();
          throw new Error(data.message);
        }
        if (parseInt(response.status) === 401) {
          localStorage.removeItem("token");
        }
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: SET_ALERT,
          payload: { set, type , calculation : {title: details.title, date: details.date ,input: data.input, output: data.output} },
        });
      })
      .catch((err) => toast.error(err.message));
  }
};

export const removeAlert = () => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT,
    payload: {},
  });
};
