import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Task {
  id: string;
  status: string;
}

interface TasksChartProps {
  tasks: Task[];
  timeframe: string;
}

const COLORS = ["#1A5D1A", "#FF9B50", "#4C3D3D"];

const TasksChart = ({ tasks }: TasksChartProps) => {
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const pendingTasks = tasks.filter(task => task.status === "pending").length;
  const inProgressTasks = tasks.filter(task => task.status === "in-progress").length;

  const data = [
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: pendingTasks },
    { name: "In Progress", value: inProgressTasks },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TasksChart;