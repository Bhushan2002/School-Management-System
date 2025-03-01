import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import { attachReactRefresh } from "next/dist/build/webpack-config";
import Image from "next/image";

type AssignmentType = Assignment & {
  lesson: {
    subject: Subject;
    teacher: Teacher;
    class: Class;
  };
};

const { userId, sessionClaims } = await auth();

const role = (sessionClaims?.metadata as {role?: string})?.role;
const currentUserId =userId;

const columns = [
  {
    header: "Subject Name",
    accessor: "subject",
    className: "",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Due Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  ...(role ==='admin' || role ==='teacher' ? [{
    header: "Actions",
    accessor: "action",
    className: "",
  }]:[]),
];



const renderRow = (item: AssignmentType) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#d3d3d3] "
  >
    <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
    <td className="hidden md:table-cell">{item.lesson.class.name}</td>
    <td className="hidden md:table-cell">
      {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
    </td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.dueDate)}
    </td>

    <td>
      <div className="flex items-center gap-2">
      {(role === "admin" || role === "teacher") && (
            <>
              <FormModal table="assignment" type="update" data={item} />
              <FormModal table="assignment" type="delete" id={item.id} />
            </>
          )}
      </div>
    </td>
  </tr>
);
const AssignmentsList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL params Conditions

 
  const query: Prisma.AssignmentWhereInput = {};
  
  query.lesson = {};


  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson = { classId: parseInt(value) };
            break;
          case "teacherId":
            query.lesson = { teacherId: value };
            break;

          case "search":
            query.lesson = {
              subject: { name: { contains: value, mode: "insensitive" } },
            };
            break;
          default:
            const { page, ...queryParams } = searchParams;
        }
      }
    }
  }

  //ROLE CONDITION
  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.lesson.teacherId = currentUserId!;
      break;
    case "student":
      query.lesson.class = {
        students: {
          some: {
            id: currentUserId!,
          },
        },
      };
      break;
    case "parent":
      query.lesson.class = {
        students: {
          some: {
            parentId: currentUserId!,
          },
        },
      };
      break;
    default:
      break;
  }



  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: {
              select: {
                name: true,
              },
            },
            teacher: {
              select: {
                name: true,
              },
            },
            class: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.assignment.count({
      where: query,
    }),
  ]);
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Assignments
        </h1>
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
            {role === "admin" || role === "teacher" && (
              <FormModal table="assignment" type="create" />
              )}
          </div>
        </div>
      </div>
      {/* list*/}

      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* //2.24 */}

      {/* pagination */}
      <Pagination page={p} count={count} />
    </div>
  );
};
export default AssignmentsList;
