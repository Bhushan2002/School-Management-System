import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";

import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type LessonList = Lesson & { class: Class } & { subject: Subject } & {
  teacher: Teacher;
};

const { userId, sessionClaims } = await auth();
const role = (sessionClaims?.metadata as { role?: string })?.role;
const currentUserId = userId;

const renderRow = (item: LessonList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#d3d3d3] "
  >
    <td className="flex items-center gap-4 p-4">{item.subject.name}</td>
    <td className="hidden md:table-cell">{item.class.name}</td>
    <td className="hidden md:table-cell">
      {item.teacher.name + " " + item.teacher.surname}
    </td>

    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="lesson" type="update" data={item} />
            <FormModal table="lesson" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);
const columns = [
  {
    header: "Subject Name",
    accessor: "subject",
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
  ...(role === "admin"
    ? [
        {
          header: "Actions",
          accessor: "action",
        },
      ]
    : []),
];

const LessonLists = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL params Conditions

  const query: Prisma.LessonWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.teacherId = value;
            break;
          case "classId":
            query.classId = parseInt(value);
            break;
          case "search":
            query.OR = [
              { subject: { name: { contains: value, mode: "insensitive" } } },
              { teacher: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
          default:
            const { page, ...queryParams } = searchParams;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        subject: { select: { name: true } },
        class: { select: { name: true } },
        teacher: { select: { name: true, surname: true } },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.lesson.count({
      where: query,
    }),
  ]);
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
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
            {role === "admin" && <FormModal table="lesson" type="create" />}
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
export default LessonLists;
