'use client'
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 109,
    fill: "white",
  },
  {
    name: "Boys",
    count: 57,
    fill: "#8ca8be",
  },

  {
    name: "Girls",
    count: 52,
    fill: "#fbd0e0",
  },
];

const CountChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* title */}
      <div className=" flex justify-between items-center">
        <h1 className="text-lg font-semibold">Student</h1>
        <Image src="/moreDark.png" alt="" height={20} width={20} />
      </div>
      {/* chart */}
      <div className=" relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image src="/maleFemale.png" alt="" width={50} height={50} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/> 
      </div>
      {/* bottom */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-secondaryElement rounded-full"></div>
          <h1 className="font-bold">1,233</h1>
          <h2 className=" text-xs text-gray-300">Boys (55%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-thirdElement rounded-full"></div>
          <h1 className="font-bold">1,233</h1>
          <h2 className=" text-xs text-gray-300">Girl (55%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
