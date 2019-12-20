import React from "react";
import { useTable } from "react-table";
import "../Styles/ScoreTable.css";
import { testData } from "../TestData.js";
import {
  ScoreCell,
  CommentCell,
  StarRatingCell
} from "../Helpers/CellRenderHelpers.js";

const columns = [
  {
    Header: "Artist",
    accessor: "artist"
  },
  {
    Header: "Title",
    accessor: "title"
  },
  {
    Header: "Song",
    accessor: "songScore",
    Cell: ScoreCell
  },
  {
    Header: "Show",
    accessor: "showScore",
    Cell: StarRatingCell
  },
  {
    Header: "Comment",
    accessor: "comment",
    Cell: CommentCell
  }
];

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <table className="score-table" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default class ScoreTable extends React.Component {
  render() {
    return <Table columns={columns} data={testData} />;
  }
}
