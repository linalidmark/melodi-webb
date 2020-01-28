import React, {Component} from "react";
import { useTable } from "react-table";
import "../Styles/ScoreTable.css";

const columns = [
  {
    Header: "Artist",
    accessor: "artist"
  },
  {
    Header: "Title",
    accessor: "title"
  },{
    Header: "User",
    accessor: "user"
  },
  {
    Header: "Song",
    accessor: "song",
  },
  {
    Header: "Show",
    accessor: "show",
  },{
    Header: "Comment",
    accessor: "comment",
  }
];


 class ScoreTable extends Component {
 
  table({ columns, data }) {
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

  render() {
    return <this.table columns={columns} data={this.props.vote} />;
  }
}

export default ScoreTable;