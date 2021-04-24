import { toast } from "react-toastify";
import { removeAlert } from "./alert";
import { setData } from "./table";
import { DELETE_PRODUCT } from "./types";

export const addUser = (newProduct) => (dispatch) => {
    fetch(
        process.env.REACT_APP_API_URL +
        "api/users/admin/create",
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
            dispatch(setData("user", "Information"));
            dispatch(removeAlert());
        })
        .catch((err) => {
            toast.error(err.message);
        });
};

export const deleteUser = (oldProduct, platform) => (dispatch) => {
    fetch(
        process.env.REACT_APP_API_URL +
        "api/users/admin/delete",
        {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "x-auth": localStorage.getItem("token"),
            },
            body: JSON.stringify({
                email: oldProduct.email,
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
