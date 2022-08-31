import React, { useState } from 'react'
import {
  createStyles,
  Group,
  Paper,
  Button,
  Tooltip,
} from "@mantine/core";
import { DatePicker } from '@mantine/dates';
import {
  Logs,
} from "../config/dummyData";

import DataTable from "react-data-table-component";
import {
  ArrowNarrowDown,
} from "tabler-icons-react";

import dayjs from 'dayjs';

const useStyles = createStyles((theme) => ({
  container: {
    fontFamily: "Regular",
    width: "100%",
    height: "fit-content",
    padding: 15,
    background:
      theme.colorScheme === "dark" ? "#424242" : theme.colors.lighttheme[0],
  },
  paper: {
    borderRadius: 15,
    backgroundColor:
      theme.colorScheme === "dark" ? "#424242" : theme.colors.gray[0],

    width: "100%",
  },
  inputimage: {
    width: "400px",
    height: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textinputs: {
    width: "100%",
    margin: `0 ${theme.spacing.xxs}px`,
  },
  registerbutton: {
    marginTop: `${theme.spacing.lg}px`,
    width: "100px",
  },
  hidden: {
    display: "none",
  },
  label: {
    display: "flex",
    cursor: "pointer",
  },
  group: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  containermodalupdate: {
    width: 430,
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const customStyles = {
  header: {
    style: {
      textAlign: "left",
      marginBottom: "25px",
      padding: 0
    },
  },
  table: {
    style: {
      textAlign: "center",
    },
  },
  headCells: {
    style: {
      textAlign: "center",
      border: "0.5px solid black",
      borderWidth: "thin",
    },
  },
  cells: {
    style: {
      textAlign: "center",
      border: "0.5px solid black",
      borderWidth: "thin",
    },
  },
};

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function convertArrayOfObjectsToCSV(array) {
  let result;

  const columnDelimiter = ',';
  const lineDelimiter = '\n';
  const keys = Object.keys(Logs[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach(item => {
    let ctr = 0;
    keys.forEach(key => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function downloadCSV(array) {
  const link = document.createElement('a');
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute('href', encodeURI(csv));
  link.setAttribute('download', filename);
  link.click();
}


const Export = ({ onExport }) => <Button onClick={e => onExport(e.target.value)}>Export Record as CSV</Button>;

const columns = [
  {
    name: 'Resident',
    selector: row => row.client,
    sortable: true,
    center: true,
  },
  {
    name: 'Document Type',
    selector: row => row.documentType,
    sortable: true,
    center: true,
  },
  {
    name: 'Kagawad on Duty',
    selector: row => row.kagawadName,
    sortable: true,
    center: true,
  },
  {
    name: 'Issuer on Duty',
    selector: row => row.clerkName,
    sortable: true,
    center: true,
  },
  {
    name: 'Payment',
    selector: row => row.price,
    sortable: true,
    center: true,
  },
  {
    name: 'Issued On',
    selector: row => dayjs(row.createdAt).format("MMM D, YYYY"),
    sortable: true,
    center: true,
  },
];

const Report = ({ colorScheme }) => {
  const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(Logs)} />, []);
  const status = "success";
  const { classes } = useStyles();
  // Filter
  const [filterByDate, setFilterByDate] = useState("");

  const filteredItems = Logs?.filter((item) => {
    if (filterByDate) {
      return dayjs(item.createdAt).format("MMM D, YYYY") && dayjs(item.createdAt).format("MMM D, YYYY").toLowerCase().includes(dayjs(filterByDate).format("MMM D, YYYY").toLowerCase())
    } else {
      return item
    }
  });

  return (
    <Paper className={classes.container}>
      <Group position="left" mb="md" mt="md" className={classes.head}>
        <Tooltip
          label="Sort Table by Date"
          withArrow
          radius="md"
          position="bottom"
        >
          <DatePicker placeholder="Pick date" label="Sort Date" onChange={setFilterByDate} />
        </Tooltip>

      </Group>
      <DataTable
        title="Transaction Records"
        columns={columns}
        data={filteredItems}
        actions={actionsMemo}
        pagination
        highlightOnHover
        pointerOnHover
        progressPending={status === "loading"}
        sortIcon={<ArrowNarrowDown />}
        theme={colorScheme === "dark" ? "dark" : "light"}
        customStyles={customStyles}
        responsive
        dense />
    </Paper>
  );
};

export default Report