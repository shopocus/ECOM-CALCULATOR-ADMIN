import { toast } from "react-toastify";
import { removeAlert } from "./alert";
import { setData } from "./table";
import { DELETE_PRODUCT, UPDATE_PRODUCT } from "./types";

export const addCollectionFees = (newProduct, platform) => (dispatch) => {
  fetch(
    process.env.REACT_APP_API_URL +
      "api/MPC/" +
      platform +
      "/admin/collectionFees/addNew",
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
      dispatch(setData(platform, "Fixed Fees"));
      dispatch(removeAlert());
    })
    .catch((err) => {
      toast.error(err.message);
    });
};

export const updateCollectionFees = (oldProduct, newProduct, platform) => (
  dispatch
) => {
  let body = {};
  if (platform === "flipkart") {
    body = {
      minSp: newProduct.minSp,
      maxSp: newProduct.maxSp,
      newRate: newProduct.rate,
    };
  }
  fetch(
    process.env.REACT_APP_API_URL +
      "api/MPC/" +
      platform +
      "/admin/collectionFees/update",
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "x-auth": localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
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

export const deleteCollectionFees = (oldProduct, platform) => (dispatch) => {
  fetch(
    process.env.REACT_APP_API_URL +
      "api/MPC/" +
      platform +
      "/admin/collectionFees/delete",
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
