"use client";
import Image from "next/image";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mon",
    present: 70,
    absent: 40,
  },
  {
    name: "Tue",
    present: 70,
    absent: 40,
  },
  {
    name: "Wed",
    present: 80,
    absent: 30,
  },
  {
    name: "Thu",
    present: 50,
    absent: 50,
  },

  {
    name: "Fri",
    present: 95,
    absent: 5,
  },
  //   {
  //     name: 'Sat',
  //     present: 100,
  //     absent: 0
  //   },
  //   {
  //     name: 'Sun',
  //     present: 40,
  //     absent: 60
  //   }
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-lg h-full p-4">
      <div className="flex flex-row justify-between py-4">
        <h1 className="text-lg font-semibold"> Attendance</h1>
        <Image src="/moreDark.png" alt="" height={20} width={20} />
      </div>
      {/* simple bar chart */}

      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3"  vertical={false} stroke="#ddd" />
          <XAxis dataKey="name" axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false} />
          <YAxis axisLine={false} />
          <Tooltip />
          <Legend align="left" verticalAlign="top" wrapperStyle={{padding:"20px", paddingBottom:"40px"}} />
          <Bar
            dataKey="present"
            fill="#8884d8"
            legendType="circle"
            radius={[4,4,0,0]}
          />
          <Bar
            dataKey="absent"
            fill="#82ca9d"
            legendType="circle"
            radius={[4,4,0,0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
