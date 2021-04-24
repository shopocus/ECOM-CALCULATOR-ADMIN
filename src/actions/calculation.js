import { toast } from "react-toastify";
import { DELETE_PRODUCT } from "./types";

export const deleteCalculation = (oldProduct, platform ,email) => (dispatch) => {
    fetch(
      process.env.REACT_APP_API_URL +
        "api/users/admin/delete/title",
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "x-auth": localStorage.getItem("token"),
        },
        body: JSON.stringify({
            company: platform,
            role:"Admin",
            title: oldProduct.title,
            email: email
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
  