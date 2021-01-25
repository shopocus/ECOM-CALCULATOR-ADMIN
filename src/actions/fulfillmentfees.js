import { toast } from "react-toastify";
import { removeAlert } from "./alert";
import { setData } from "./table";
import { DELETE_PRODUCT, UPDATE_PRODUCT } from "./types";

export const addFulfillmentFees = (newProduct, platform) => (dispatch) => {
  fetch(
    process.env.REACT_APP_API_URL +
      "api/MPC/" +
      platform +
      "/admin/fulfillment/addNew",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-auth": localStorage.getItem("token"),
      },
      body: JSON.stringify(newProduct),
    }
  )
    .then(async function (response) {
      if (!response.ok) {
        let data = await response.json();
        throw new Error(data.message);
      }
      return response.json();
    })
    .then((data) => {
      toast.success(data.message);
      dispatch(setData(platform, "Referral"));
      dispatch(removeAlert());
    })
    .catch((err) => {
      toast.error(err.message);
    });
};

export const updateFulfillmentFees = (oldProduct, newProduct, platform) => (
  dispatch
) => {
  fetch(
    process.env.REACT_APP_API_URL +
      "api/MPC/" +
      platform +
      "/admin/fulfillment/update",
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "x-auth": localStorage.getItem("token"),
      },
      body: JSON.stringify(newProduct),
    }
  )
    .then(async function (response) {
      if (!response.ok) {
        let data = await response.json();
        throw new Error(data.message);
      }
      return response.json();
    })
    .then((data) => {
      toast.success(data.message);
      dispatch({
        type: UPDATE_PRODUCT,
        payload: {
          newProduct,
          oldProduct,
        },
      });
    })
    .catch((err) => {
      toast.error(err.message);
    });
};

export const deleteFulfillmentFees = (oldProduct, platform) => (dispatch) => {
  fetch(
    process.env.REACT_APP_API_URL +
      "api/MPC/" +
      platform +
      "/admin/fulfillment/delete",
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "x-auth": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        minSp: oldProduct.minSp,
      }),
    }
  )
    .then(async function (response) {
      if (!response.ok) {
        let data = await response.json();
        throw new Error(data.message);
      }
      return response.json();
    })
    .then((data) => {
      toast.success(data.message);
      dispatch({
        type: DELETE_PRODUCT,
        payload: {
          oldProduct,
        },
      });
    })
    .catch((err) => {
      toast.error(err.message);
    });
};
