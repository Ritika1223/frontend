// components/DonutChart.js
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#7C3AED', '#FBBF24', '#F472B6', '#F97316', '#E879F9', '#FDE68A'];

const DonutChart = ({ data, title }) => (
  <div className="bg-white rounded-xl shadow p-4 w-full max-w-sm">
    <h2 className="text-center font-semibold text-gray-700 mb-2">{title}</h2>
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default DonutChart;
