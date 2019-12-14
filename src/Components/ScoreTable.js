import React from 'react';
import { useTable } from 'react-table'
import '../Styles/ScoreTable.css';

const columns = [
      {
        Header: 'Artist',
        accessor: 'artist'
      },
      {
        Header: 'Title',
        accessor: 'title'
      },
      {
        Header: 'Song',
        accessor: 'songScore'
      },
      {
        Header: 'Show',
        accessor: 'showScore'
      },
      {
        Header: 'Comment',
        accessor: 'comment'
      }
    ]


function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    })

    return (
        <table className="score-table" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(
              (row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                )}
            )}
          </tbody>
        </table>
      )
}
  
export default class ScoreTable extends React.Component {
    render() {
      return <Table columns={columns} data={[]} />;
    }
  }