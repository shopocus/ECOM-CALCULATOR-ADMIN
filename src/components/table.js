import MaterialTable from "material-table";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { removeData, setData } from "../actions/table";
import { LinearProgress } from "@material-ui/core";

export default function Table(props) {
  let params = useParams();
  const dispatch = useDispatch();
  const table = useSelector((state) => state.table);
  useEffect(() => {
    dispatch(removeData());
    dispatch(setData(params.platform, props.type));
  }, [dispatch, params.platform, props.type]);

  return (
    <MaterialTable
      title={params.platform + " " + props.type}
      columns={table.column}
      data={table.data}
      editable={table.editable}
      actions={table.actions}
      localization={{
        body: {
          emptyDataSourceMessage: <LinearProgress />,
        },
      }}
      options={{
        paging: false,
        actionsColumnIndex: -1,
        headerStyle: {
          backgroundColor: "#F7852E",
          color: "#FFF",
        },
      }}
    />
  );
}
