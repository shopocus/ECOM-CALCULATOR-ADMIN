import { toast } from "react-toastify";
import { removeAlert } from "./alert";
import { setData } from "./table";
import { UPDATE_PRODUCT } from "./types";
import { diff } from "./util";

export const addShipping = (newProduct, platform) => (dispatch) => {
  fetch(
    process.env.REACT_APP_API_URL +
      "api/MPC/" +
      platform +
      "/admin/outwardShipping/addNew",
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
      dispatch(setData(platform, "Shipping"));
      dispatch(removeAlert());
    })
    .catch((err) => {
      toast.error(err.message);
    });
};

export const updateShipping = (oldProduct, newProduct, platform) => (
  dispatch
) => {
  let value = JSON.parse(JSON.stringify(oldProduct));
  delete value.tableData;
  let update = diff(value, newProduct);
  let body = {};
  if (platform === "clubFactory") {
    body = {
      type: oldProduct.type + "OutwardShipping",
      field:
        oldProduct.region +
        Object.keys(update)[0].charAt(0).toUpperCase() +
        Object.keys(update)[0].slice(1),
      newValue: Object.values(update)[0],
    };
  }
  if (platform === "flipkart") {
    body = {
      type:
        "weight" +
        newProduct.type.charAt(0).toUpperCase() +
        newProduct.type.slice(1) +
        "_outwardShipping",
      field: Object.keys(update)[0],
      newValue: Object.values(update)[0],
    };
  }
  if (platform === "amazonFba" || platform === "amazon") {
    body = newProduct;
  }

  fetch(
    process.env.REACT_APP_API_URL +
      "api/MPC/" +
      platform +
      "/admin/outwardShipping/update",
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
