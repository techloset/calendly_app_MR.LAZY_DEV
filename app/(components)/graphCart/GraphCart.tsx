// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
// import { BarChart, Bar, Rectangle, ResponsiveContainer } from "recharts";

// import React from "react";

// export default function GraphCart() {
//   const data = [
//     {
//       name: "Monday",
//       uv: 4000,
//       pv: 2400,
//       amt: 2400,
//     },
//     {
//       name: "Tuesday",
//       uv: 3000,
//       pv: 1398,
//       amt: 2210,
//     },
//     {
//       name: "Wednesday",
//       uv: 2000,
//       pv: 9800,
//       amt: 2290,
//     },
//     {
//       name: "Thusday",
//       uv: 2780,
//       pv: 3908,
//       amt: 2000,
//     },
//     {
//       name: "Friday",
//       uv: 1890,
//       pv: 4800,
//       amt: 2181,
//     },
//     {
//       name: "Saturday",
//       uv: 2390,
//       pv: 3800,
//       amt: 2500,
//     },
//     {
//       name: "Sunday",
//       uv: 3490,
//       pv: 4300,
//       amt: 2100,
//     },
//   ];
//   return (
//     <BarChart
//       width={1130}
//       height={310}
//       data={data}
//       margin={{
//         top: 5,
//         right: 30,
//         left: 20,
//         bottom: 5,
//       }}
//     >
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Bar
//         dataKey="pv"
//         fill="#8884d8"
//         activeBar={<Rectangle fill="pink" stroke="blue" />}
//       />
//       <Bar
//         dataKey="uv"
//         fill="#82ca9d"
//         activeBar={<Rectangle fill="gold" stroke="purple" />}
//       />
//     </BarChart>
//   );
// }
import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

export interface ScheduleEvent {
  _id: string;
  name: string;
  time: string;
  date: string;
  timeZone: string;
  ownerEmail: string;
  ownerName: string;
  email: string;
  additionalInfo: string;
  createdAt: string;
}

export interface RootState {
  fetchScheduleEvents: {
    data: ScheduleEvent[];
  };
}

const getDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

const GraphCart: React.FC = () => {
  const scheduleEvents = useSelector(
    (state: RootState) => state.fetchScheduleEvents.data
  );

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const eventsCount: Record<string, number> = daysOfWeek.reduce((acc, day) => {
    acc[day] = 0;
    return acc;
  }, {} as Record<string, number>);

  scheduleEvents.forEach((event: ScheduleEvent) => {
    const dayOfWeek = getDayOfWeek(event.date);
    if (eventsCount[dayOfWeek] !== undefined) {
      eventsCount[dayOfWeek]++;
    }
  });

  const seriesData = daysOfWeek.map((day) => eventsCount[day]);
  const totalValue = seriesData.reduce((acc, val) => acc + val, 0);
  const cappedSeriesData = seriesData.map((val) => Math.min(val, 30));

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: daysOfWeek,
    },
    tooltip: {
      y: {
        formatter: (val: number) => val,
        title: {
          formatter: () => "Number of Events",
        },
      },
    },
  };

  const series = [
    {
      name: "Number of Events",
      data: cappedSeriesData,
    },
  ];

  return (
    <>
      <p>Total number of events this week is {totalValue}</p>
      <Chart options={options} series={series} type="bar" height={350} />
    </>
  );
};

export default GraphCart;
