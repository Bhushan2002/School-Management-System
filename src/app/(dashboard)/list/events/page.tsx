import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { eventsData, role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Event } from "@prisma/client";

type EventType = Event & { class: Class };

const columns = [
  {
    header: "Title",
    accessor: "title",
    className: "",
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
    header: "Start Time",
    accessor: "startTime",
    className: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "",
  },
];

const renderRow = (item: EventType) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#d3d3d3] "
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td className="hidden md:table-cell">{item.class.name}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.startTime)}
    </td>
    <td className="hidden md:table-cell">
      {item.startTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </td>
    <td className="hidden md:table-cell">
      {item.endTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </td>

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
const EventsList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;

  // URL params Conditions

  const query: Prisma.EventWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.OR = [
              { title: { contains: value, mode: "insensitive" } },
              { class: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.event.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
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
            {role === "admin" && <FormModal table="event" type="create" />}
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
export default EventsList;
