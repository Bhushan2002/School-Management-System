// 'use client';

import { JSX } from "react";

const Table = ({
  columns,
  renderRow,
  data
}: {
  columns: {
      map(arg0: (column: any) => JSX.Element): import("react").ReactNode; header: string; accessor: string; className?: string 
};
  renderRow: (data: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full mt-6">
      <thead>
        <tr className="text-left text-sm text-gray-500 ">
          {columns.map((column) => (
            <th key={column.accessor} className={column.className}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => renderRow(item))}
      </tbody>
    </table>
  );
};

export default Table;
