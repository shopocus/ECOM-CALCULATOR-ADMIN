import { toast } from "react-toastify";
import { removeAlert } from "./alert";
import { ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "./types";

export const addCommission = (newProduct, platform) => (dispatch) => {
  let body = {
    category: newProduct.category,
    commission: parseInt(newProduct.commission),
  }
  if (platform === "meesho") {
    body.subcategory = newProduct.subcategory
  }
  fetch(
    process.env.REACT_APP_API_URL +
    "api/MPC/" +
    platform +
    "/admin/commission/addNew",
    {
      method: "POST",
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
        type: ADD_PRODUCT,
        payload: {
          newProduct,
        },
      });
      dispatch(removeAlert());
    })
    .catch((err) => {
      toast.error(err.message);
    });
};

export const deleteCommission = (oldProduct, platform) => (dispatch) => {
  let body = {
    category: oldProduct.category
  }
  if (platform === "meesho") {
    body.subcategory = oldProduct.subcategory
  }
  fetch(
    process.env.REACT_APP_API_URL +
    "api/MPC/" +
    platform +
    "/admin/commission/delete",
    {
      method: "DELETE",
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

export const updateCommission = (oldProduct, newProduct, platform) => (
  dispatch
) => {
  let body = {
    category: newProduct.category,
    newCommission: parseInt(newProduct.commission),
  }
  if (platform === "meesho") {
    body.subcategory = newProduct.subcategory
  }
  fetch(
    process.env.REACT_APP_API_URL +
    "api/MPC/" +
    platform +
    "/admin/commission/update",
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
