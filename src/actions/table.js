import { toast } from "react-toastify";
import {
  addCommission,
  updateCommission,
  deleteCommission,
} from "./commission";
import { addShipping, updateShipping } from "./shipping";
import { setAlert } from "./alert";
import { SET_DATA, REMOVE_DATA } from "./types";
import { addFixedFees, deleteFixedFees, updateFixedFees } from "./fixedfees";
import {
  addCollectionFees,
  deleteCollectionFees,
  updateCollectionFees,
} from "./collectionfees";
import { addReferral, deleteReferral, updateReferral } from "./referral";
import {
  addClosingFees,
  deleteClosingFees,
  updateClosingFees,
} from "./closingfees";
import { addFulfillmentFees, updateFulfillmentFees } from "./fulfillmentfees";

export const setData = (platform, type) => (dispatch) => {
  let column = [];
  let editable = {};
  let actions = [];
  let url = "";
  if (type === "Commission") {
    column = [
      { title: "Category", field: "category", editable: "onAdd" },
      { title: "Commission", field: "commission" },
    ];
    let form = {
      set: true,
      type: "Add",
      page: type,
      fields: ["category", "commission"],
      onSubmit: addCommission,
    };

    actions = [
      {
        icon: "add",
        tooltip: "Add Commission",
        isFreeAction: true,
        onClick: (event) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dispatch(setAlert(true, form));
              resolve();
            }, 1000);
          }),
      },
    ];
    editable = {
      onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(updateCommission(oldData, newData, platform));
            resolve();
          }, 1000);
        }),
      onRowDelete: (oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(deleteCommission(oldData, platform));
            resolve();
          }, 1000);
        }),
    };
    url =
      process.env.REACT_APP_API_URL +
      "api/MPC/" +
      platform +
      "/admin/commission/getAll";
  }
  if (type === "Shipping") {
    if (platform === "clubFactory") {
      column = [
        { title: "Type", field: "type", editable: "onAdd" },
        { title: "Region", field: "region", editable: "onAdd" },
        { title: "Min", field: "min" },
        { title: "Max", field: "max" },
      ];
      let form = {
        set: true,
        type: "Add",
        page: type,
        fields: ["type", "field", "value"],
        onSubmit: addShipping,
      };
      actions = [
        {
          icon: "add",
          tooltip: "Add Shipping",
          isFreeAction: true,
          onClick: (event) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                dispatch(setAlert(true, form));
                resolve();
              }, 1000);
            }),
        },
      ];
    }
    if (platform === "flipkart") {
      column = [
        { title: "Type", field: "type", editable: "onAdd" },
        { title: "Local", field: "local" },
        { title: "Zonal", field: "zonal" },
        { title: "National", field: "national" },
      ];
      let form = {
        set: true,
        type: "Add",
        page: type,
        fields: ["type", "field", "value"],
        onSubmit: addShipping,
      };
      actions = [
        {
          icon: "add",
          tooltip: "Add Shipping",
          isFreeAction: true,
          onClick: (event) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                dispatch(setAlert(true, form));
                resolve();
              }, 1000);
            }),
        },
      ];
    }
    if (platform === "amazonFba" || platform === "amazon") {
      column = [
        {
          title: "Weight Category",
          field: "weightCategory",
          editable: "onAdd",
        },
        {
          title: "Weight SubCategory",
          field: "weightSubCategory",
          editable: "onAdd",
        },
        { title: "Local", field: "local" },
        { title: "Regional", field: "regional" },
        { title: "National", field: "national" },
      ];
      let form = {
        set: true,
        type: "Add",
        page: type,
        fields: [
          "weightCategory",
          "weightSubCategory",
          "local",
          "regional",
          "national",
        ],
        onSubmit: addShipping,
      };
      actions = [
        {
          icon: "add",
          tooltip: "Add Shipping",
          isFreeAction: true,
          onClick: (event) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                dispatch(setAlert(true, form));
                resolve();
              }, 1000);
            }),
        },
      ];
    }
    editable = {
      onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(updateShipping(oldData, newData, platform));
            resolve();
          }, 1000);
        }),
    };
    url =
      process.env.REACT_APP_API_URL +
      "api/MPC/" +
      platform +
      "/admin/outwardShipping/getAll";
  }
  if (type === "Fixed Fees") {
    column = [
      { title: "Min", field: "minSp", editable: "onAdd" },
      { title: "Max", field: "maxSp" },
      { title: "Range", field: "rate" },
    ];
    url =
      process.env.REACT_APP_API_URL +
      "api/MPC/" +
      platform +
      "/admin/fixedFees/getAll";
    let form = {
      set: true,
      type: "Add",
      page: type,
      fields: ["minSp", "rate"],
      onSubmit: addFixedFees,
    };
    actions = [
      {
        icon: "add",
        tooltip: "Add Fixed Fees",
        isFreeAction: true,
        onClick: (event) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dispatch(setAlert(true, form));
              resolve();
            }, 1000);
          }),
      },
    ];
    editable = {
      onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(updateFixedFees(oldData, newData, platform));
            resolve();
          }, 1000);
        }),
      onRowDelete: (oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(deleteFixedFees(oldData, platform));
            resolve();
          }, 1000);
        }),
    };
  }
  if (type === "Collection Fees") {
    column = [
      { title: "Min", field: "minSp", editable: "onAdd" },
      { title: "Max", field: "maxSp" },
      { title: "Post Paid %", field: "postPaidPercentage" },
      { title: "Post Paid \u20B9", field: "postPaidRuppee" },
      { title: "Pre Paid %", field: "prePaidPercentage" },
      { title: "Pre Paid \u20B9", field: "prePaidRuppee" },
    ];
    url =
      process.env.REACT_APP_API_URL +
      "api/MPC/" +
      platform +
      "/admin/collectionFees/getAll";
    let form = {
      set: true,
      type: "Add",
      page: type,
      fields: [
        "minSp",
        "maxSp",
        "prePaidType",
        "prePaidValue",
        "postPaidType",
        "postPaidValue",
      ],
      onSubmit: addCollectionFees,
    };
    actions = [
      {
        icon: "add",
        tooltip: "Add Collection Fees",
        isFreeAction: true,
        onClick: (event) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dispatch(setAlert(true, form));
              resolve();
            }, 1000);
          }),
      },
    ];
    editable = {
      onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(updateCollectionFees(oldData, newData, platform));
            resolve();
          }, 1000);
        }),
      onRowDelete: (oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(deleteCollectionFees(oldData, platform));
            resolve();
          }, 1000);
        }),
    };
  }
  if (type === "Referral") {
    column = [
      { title: "Category", field: "category", editable: "onAdd" },
      { title: "Subcategory", field: "subcategory", editable: "onAdd" },
      { title: "Partition Amount", field: "partitionAmount" },
      { title: "Primary Commission", field: "primaryCommission" },
      { title: "Secondary Commission", field: "secondaryCommission" },
    ];
    url =
      process.env.REACT_APP_API_URL +
      "api/MPC/" +
      platform +
      "/admin/referral/getAll";
    let form = {
      set: true,
      type: "Add",
      page: type,
      fields: [
        "category",
        "subcategory",
        "partitionAmount",
        "primaryCommission",
        "secondaryCommission",
      ],
      onSubmit: addReferral,
    };
    actions = [
      {
        icon: "add",
        tooltip: "Add Referral",
        isFreeAction: true,
        onClick: (event) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dispatch(setAlert(true, form));
              resolve();
            }, 1000);
          }),
      },
    ];
    editable = {
      onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(updateReferral(oldData, newData, platform));
            resolve();
          }, 1000);
        }),
      onRowDelete: (oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(deleteReferral(oldData, platform));
            resolve();
          }, 1000);
        }),
    };
  }
  if (type === "Closing Fees") {
    column = [
      { title: "Min", field: "minSp", editable: "onAdd" },
      { title: "Max", field: "maxSp" },
    ];
    let form = {
      set: true,
      type: "Add",
      page: type,
      fields: ["minSp", "maxSp"],
      onSubmit: addClosingFees,
    };
    if (platform === "amazon") {
      column.push(
        { title: "Easy Ship Non Prime", field: "easyShipNonPrime" },
        { title: "Easy Ship Prime", field: "easyShipPrime" },
        { title: "Self Ship", field: "selfShip" }
      );
      form.fields.push("easyShipNonPrime", "easyShipPrime", "selfShip");
    }
    if (platform === "amazonFba") {
      column.push({ title: "FBA", field: "fba" });
      form.fields.push("fba");
    }
    url =
      process.env.REACT_APP_API_URL +
      "api/MPC/" +
      platform +
      "/admin/closingFees/getAll";
    actions = [
      {
        icon: "add",
        tooltip: "Add Closing Fees",
        isFreeAction: true,
        onClick: (event) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dispatch(setAlert(true, form));
              resolve();
            }, 1000);
          }),
      },
    ];
    editable = {
      onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(updateClosingFees(oldData, newData, platform));
            resolve();
          }, 1000);
        }),
      onRowDelete: (oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(deleteClosingFees(oldData, platform));
            resolve();
          }, 1000);
        }),
    };
  }
  if (type === "Fulfillment Fees") {
    column = [
      { title: "Category", field: "category", editable: "onAdd" },
      { title: "Subcategory", field: "subcategory", editable: "onAdd" },
      { title: "Local Shipping Fees", field: "localShippingFees" },
      { title: "Regional Shipping Fees", field: "regionalShippingFees" },
      { title: "National Shipping Fees", field: "nationalShippingFees" },
      { title: "Pick And Pack Fees", field: "pickAndPackFees" },
      { title: "Storing Fees", field: "storingFees" },
    ];
    let form = {
      set: true,
      type: "Add",
      page: type,
      fields: [
        "category",
        "subcategory",
        "pickAndPackFees",
        "storageFees",
        "localShippingFees",
        "regionalShippingFees",
      ],
      onSubmit: addFulfillmentFees,
    };
    url =
      process.env.REACT_APP_API_URL +
      "api/MPC/" +
      platform +
      "/admin/fulfillment/getAll";
    actions = [
      {
        icon: "add",
        tooltip: "Add Closing Fees",
        isFreeAction: true,
        onClick: (event) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dispatch(setAlert(true, form));
              resolve();
            }, 1000);
          }),
      },
    ];
    editable = {
      onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(updateFulfillmentFees(oldData, newData, platform));
            resolve();
          }, 1000);
        }),
    };
  }
  fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "x-auth": localStorage.getItem("token"),
    },
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
        type: SET_DATA,
        payload: { column, data, editable, actions },
      });
    })
    .catch((err) => toast.error(err.message));
};
export const removeData = () => (dispatch) => {
  dispatch({
    type: REMOVE_DATA,
    payload: {},
  });
};
