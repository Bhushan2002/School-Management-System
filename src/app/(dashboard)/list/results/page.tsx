"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { resultsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Results = {
  id: number;
  subject: string;
  student: string;
  score: string;
  class: string;
  teacher: string;
  date: string;
};

type Column = {
  header: string;
  accessor: string;
  className?: string;
};

const columns: Column[] = [
  {
    header: "Subject Name",
    accessor: "subject",
    className: "",
  },
  {
    header: "Student",
    accessor: "student",
    className: "hidden md:table-cell",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "",
  },
];

const ResultsList = () => {
  const renderRow = (item: Results) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#d3d3d3] "
    >
      <td className="flex items-center gap-4 p-4">{item.subject}</td>
      <td className="hidden md:table-cell">{item.student}</td>
      <td className="hidden md:table-cell">{item.score}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden md:table-cell">{item.date}</td>

      <td>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/teachers/${item.id}`}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full  bg-secondaryElement ">
              <Image
                src="/edit.png"
                width={16}
                height={16}
                alt=""
                className="justify-center items-center"
              />
            </button>
          </Link>

          {role === "admin" && (
            
            <FormModal table="result" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
        <div className=" flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center justify-center gap-4 self-end">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-forthEle ">
              <Image
                src="/filter.png"
                width={14}
                height={14}
                alt="Add"
                className="justify-center items-center"
              />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-forthEle ">
              <Image
                src="/sort.png"
                width={14}
                height={14}
                alt="Add"
                className="justify-center items-center"
              />
            </button>
            {role === "admin" && (
             
              <FormModal table="result" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* list*/}

      <Table columns={columns} renderRow={renderRow} data={resultsData} />
      {/* //2.24 */}

      {/* pagination */}
      <Pagination />
    </div>
  );
};
export default ResultsList;
