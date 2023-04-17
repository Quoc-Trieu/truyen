import React, { useMemo } from 'react';
import { useTable } from 'react-table';
  

const AttendanceCheck = () => {
  const data = useMemo(
    () => [
      {
        stt: 1,
        vungCao: 'Vùng cao 1',
        ten: 'Nguyễn Văn A',
        tongNgayCong: 25,
        ngayCong: [8, 8, 9],
      },
      {
        stt: 2,
        vungCao: 'Vùng cao 2',
        ten: 'Trần Thị B',
        tongNgayCong: 28,
        ngayCong: [9, 9, 10],
      },
      // ...
    ],
    []
  );


  const columns = useMemo(
    () => [
      {
        Header: 'STT',
        accessor: 'stt',
      },
      {
        Header: 'Vùng cạo',
        accessor: 'vungCao',
      },
      {
        Header: 'Tên',
        accessor: 'ten',
      },
      {
        Header: 'Tổng ngày công',
        accessor: 'tongNgayCong',
      },
      {
        Header: 'Ngày công',
        columns: Array.from({ length: 30 }, (_, i) => ({
          Header: `Ngày ${i + 1}`,
          accessor: `ngayCong[${i}]`,
        })),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.stt} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th key={column.stt} {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr key={row.stt} {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td key={cell.stt} {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AttendanceCheck;
