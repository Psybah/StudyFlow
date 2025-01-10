import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface StudyChartProps {
  timeframe: string;
}

const StudyChart = ({ timeframe }: StudyChartProps) => {
  // Mock data - replace with real data from your backend
  const data = [
    { name: "Mon", hours: 2 },
    { name: "Tue", hours: 3 },
    { name: "Wed", hours: 1 },
    { name: "Thu", hours: 4 },
    { name: "Fri", hours: 3 },
    { name: "Sat", hours: 2 },
    { name: "Sun", hours: 5 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Line type="monotone" dataKey="hours" stroke="#1A5D1A" strokeWidth={2} dot={{ fill: "#1A5D1A" }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StudyChart;