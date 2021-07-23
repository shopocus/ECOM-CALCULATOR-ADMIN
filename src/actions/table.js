import { toast } from "react-toastify";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  addCommission,
  updateCommission,
  deleteCommission,
} from "./commission";
import { updateShipping } from "./shipping";
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
import { addUser, deleteUser, disableUser } from "./user";
import { deleteCalculation } from "./calculation";

export const setData = (platform, type, email) => (dispatch) => {
  let column = [];
  let editable = {};
  let actions = [];
  let url = "";
  if (email !== undefined) {
    column = [
      { title: "Title", field: "title" },
      { title: "Date", field: "date" },
    ];
    editable = {
      onRowDelete: (oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(deleteCalculation(oldData, platform, email));
            resolve();
          }, 1000);
        }),
    };
    actions = [
      {
        icon: 'info',
        tooltip: 'calculation',
        onClick: (event, rowData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dispatch(setAlert(true, "calculation", { platform, email, title: rowData.title, date: rowData.date }));
              resolve();
            }, 1000);
          }),
      },
      {
        icon: () => (<ArrowBackIcon />),
        tooltip: 'back',
        isFreeAction: true,
        onClick: (event, rowData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              window.location = "../user"
              resolve();
            }, 1000);
          }),
      }
    ]
    url = process.env.REACT_APP_API_URL + "api/users/admin/show/saved/title?company=" + platform + "&email=" + email + "&role=Admin"
  }

  if (type === "Commission") {
    column = [
      { title: '#', field: 'tableData.id', render: rowData => { return (<p>{rowData.tableData.id + 1}</p>) }, width: "5%", editable: "onAdd" },
      { title: "Category", field: "category", editable: "onAdd" }
    ];
    let form = {
      type: "Add",
      page: type,
      fields: ["category", "commission"],
      onSubmit: addCommission,
    };
    if (platform === "meesho") {
      column.push({ title: "Sub Category", field: "subcategory", editable: "onAdd" })
      form.fields.push("subcategory")
    }
    column.push({ title: "Commission", field: "commission" })
    actions = [
      {
        icon: "add",
        tooltip: "Add Commission",
        isFreeAction: true,
        onClick: (event) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dispatch(setAlert(true, "form", form));
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
    if (platform === "meesho") {
      column = [
        { title: "Type", field: "type", editable: "onAdd" },
        { title: "Price", field: "price", editable: "onUpdate" }
      ];
      editable = {
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dispatch(updateShipping(oldData, newData, platform));
              resolve();
            }, 1000);
          }),
      };
    }
    if (platform === "clubFactory") {
      column = [
        { title: "Type", field: "type", editable: "onAdd" },
        { title: "Region", field: "region", editable: "onAdd" },
        { title: "Min", field: "min" },
        { title: "Max", field: "max" },
      ];
      // let form = {
      //   type: "Add",
      //   page: type,
      //   fields: ["type", "field", "value"],
      //   onSubmit: addShipping,
      // };
      actions = [
        // {
        //   icon: "add",
        //   tooltip: "Add Shipping",
        //   isFreeAction: true,
        //   onClick: (event) =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         dispatch(setAlert(true, "form", form));
        //         resolve();
        //       }, 1000);
        //     }),
        // },
      ];
    }
    if (platform === "flipkart") {
      column = [
        { title: "Type", field: "type", editable: "onAdd" },
        { title: "Local", field: "local" },
        { title: "Zonal", field: "zonal" },
        { title: "National", field: "national" },
      ];
      // let form = {
      //   type: "Add",
      //   page: type,
      //   fields: ["type", "field", "value"],
      //   onSubmit: addShipping,
      // };
      actions = [
        // {
        //   icon: "add",
        //   tooltip: "Add Shipping",
        //   isFreeAction: true,
        //   onClick: (event) =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         dispatch(setAlert(true, "form", form));
        //         resolve();
        //       }, 1000);
        //     }),
        // },
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
      // let form = {
      //   type: "Add",
      //   page: type,
      //   fields: [
      //     "weightCategory",
      //     "weightSubCategory",
      //     "local",
      //     "regional",
      //     "national",
      //   ],
      //   onSubmit: addShipping,
      // };
      actions = [
        // {
        //   icon: "add",
        //   tooltip: "Add Shipping",
        //   isFreeAction: true,
        //   onClick: (event) =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         dispatch(setAlert(true, "form", form));
        //         resolve();
        //       }, 1000);
        //     }),
        // },
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
      { title: "Rate", field: "rate" },
    ];
    url =
      process.env.REACT_APP_API_URL +
      "api/MPC/" +
      platform +
      "/admin/fixedFees/getAll";
    let form = {

      type: "Add",
      page: type,
      fields: ["minSp", "maxSp", "rate"],
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
              dispatch(setAlert(true, "form", form));
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
  if (type === "Information" && (platform === "user" || platform === "activeuser")) {
    column = [
      { title: '#', field: 'tableData.id', render: rowData => { return (<p>{rowData.tableData.id + 1}</p>) }, editable: "onAdd" },
      { title: "Name", field: "name" },
      { title: "Email", field: "email" },
      { title: "Mobile Number", field: "mobile_no" },
      { title: "Created At", field: "created_at" },
      { title: "Meesho Calculation Count", field: "meesho_calculate_count" },
      { title: "Meesho Save Count", field: "meesho_save_count" },
      { title: "Club Factory Calculation Count", field: "clubFactory_calculate_count" },
      { title: "Club Factory Save Count", field: "clubFactory_save_count" },
      { title: "Flipkart Calculation Count", field: "flipkart_calculate_count" },
      { title: "Flipkart Save Count", field: "flipkart_save_count" },
      { title: "Amazon Calculation Count", field: "amazon_calculate_count" },
      { title: "Amazon Save Count", field: "amazon_save_count" },
      { title: "Amazon FBA Calculation Count", field: "amazonFba_calculate_count" },
      { title: "Amazon FBA Save Count", field: "amazonFba_save_count" },
      { title: "EBay Calculation Count", field: "ebay_calculate_count" },
      { title: "EBay Save Count", field: "ebay_save_count" },
      { title: "Others Calculation Count", field: "other_calculate_count" },
      { title: "Others Save Count", field: "other_save_count" },
      { title: "Calculation Count", field: "total_Calculation_count" },
      { title: "Save Count", field: "total_save_count" },
      { title: "Is Active", field: "is_active", lookup: { true: 'Active', false: 'Inactive' }, }
    ];
    url =
      process.env.REACT_APP_API_URL +
      "api/users/admin/read";
    if (platform === "activeuser") {
      url = process.env.REACT_APP_API_URL +
        "api/users/admin/stats"
    }
    let form = {

      type: "Add",
      page: "User",
      fields: ["name", "email", "mobile_no", "password"],
      onSubmit: addUser,
    };
    actions = [
      {
        icon: "add",
        tooltip: "Add User",
        isFreeAction: true,
        onClick: (event) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dispatch(setAlert(true, "form", form));
              resolve();
            }, 1000);
          }),
      },
      {
        icon: "delete",
        tooltip: "Disable User",
        onClick: (event, row) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dispatch(disableUser(row, platform));
              resolve();
            }, 1000);
          }),
      },
    ];
    editable = {
      onRowDelete: (oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(deleteUser(oldData, platform));
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
              dispatch(setAlert(true, "form", form));
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
      { title: '#', field: 'tableData.id', render: rowData => { return (<p>{rowData.tableData.id + 1}</p>) }, width: "5%", editable: "onAdd" },
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
              dispatch(setAlert(true, "form", form));
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
              dispatch(setAlert(true, "form", form));
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
              dispatch(setAlert(true, "form", form));
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
      if (email !== undefined) data = data.title
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
