"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Form } from "react-hook-form";


type Teacher={
    id: number,
    teacherID: string,
    name: string,
    email?: string,
    photo: string,
    phone: string,
    address: string,
    classes: string[],
    subjects: string[],

}

const columns = [
    {
        header: "info",
        accessor: "info",
        
    },
    {
        header: "Teacher ID",
        accessor: "teacherID",
        className: "hidden md:table-cell",
    },
    {
        header: "Subjects",
        accessor: "subjects",
        className: "hidden md:table-cell"
    },
    {
        header: "Classes",
        accessor: "classes",
        className: "hidden md:table-cell"
    },
    {
        header: "Phone",
        accessor: "phone",
        className: "hidden md:table-cell"
    },
    {
        header: "Address",
        accessor: "address",
        className: "hidden md:table-cell"
    },
    {
        header: "Actions",
        accessor: "action",
       
    },
];

const Teachers = () => {
    const renderRow = (item:Teacher)=>(
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#d3d3d3] " >
            <td className="flex items-center gap-4 p-4">
                <Image className="md:hidden xl:block w-10 h-10 rounded-full object-cover" src={item.photo} alt="" height={40} width={40}/>
                <div className=" flex flex-col">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item?.email}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.id}</td>
            <td className="hidden md:table-cell">{item.teacherID}</td>
            <td className="hidden md:table-cell">{item.subjects.join(",")}</td>
            <td className="hidden md:table-cell">{item.classes.join(",")}</td>
            <td className="hidden md:table-cell">{item.phone}</td>
            <td className="hidden md:table-cell">{item.address}</td>
            <td> 
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/teachers/${item.id}`}>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full  bg-secondaryElement ">
                            <Image src="/view.png" width={16} height={16} alt="" className="justify-center items-center"/>
                        </button>
                        </Link>
                        
                        {role ==="admin" && (
                        //   <button className="w-8 h-8 flex items-center justify-center rounded-full bg-thirdElement ">
                        //     <Image src="/delete.png" width={16} height={16} alt="" className="justify-center items-center"/>
                        // </button>
                          <FormModal table="teacher" type="delete" id={item.id}/>
                        )}
                </div>
            </td>
        </tr>
    );
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
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
            {/* { role === "admin" && <button className="w-10 h-10 flex items-center justify-center rounded-full bg-forthEle ">
              <Image
                src="/plus.png"
                width={14}
                height={14}
                alt="Add"
                className="justify-center items-center"
              />
            </button>} */
            <FormModal table="teacher" type="create" />
            }
          </div>
        </div>
      </div>
      {/* list*/}
      
        <Table columns={columns} renderRow={renderRow} data={teachersData} />
  
      {/* pagination */}
      <Pagination />
    </div>
  );
};
export default Teachers;
