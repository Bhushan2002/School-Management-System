'use client'
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", income: 5000, expense: 3200 },
  { name: "Feb", income: 4500, expense: 2900 },
  { name: "Mar", income: 5200, expense: 3100 },
  { name: "Apr", income: 4800, expense: 3000 },
  { name: "May", income: 5500, expense: 3300 },
  { name: "Jun", income: 6000, expense: 3500 },
  { name: "Jul", income: 5700, expense: 3400 },
  { name: "Aug", income: 6300, expense: 3600 },
  { name: "Sep", income: 4900, expense: 3100 },
  { name: "Oct", income: 5100, expense: 3000 },
  { name: "Nov", income: 6500, expense: 3700 },
  { name: "Dec", income: 7000, expense: 4000 },
];

const FinanceChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className=" flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finance Chart</h1>
        <Image src="/moreDark.png" alt="" height={20} width={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} tickMargin={15} />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ padding: "20px", paddingBottom: "40px" }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#82ca9d"
            strokeWidth={5}
          />
          <Line type="monotone" dataKey="expense" stroke="#8884d8"  strokeWidth={5}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
