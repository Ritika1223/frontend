// DashboardCharts.js
import DonutChart from "../Pages/DonutChart";

const browserData = [
  { name: 'Chrome', value: 65 },
  { name: 'Firefox', value: 15 },
  { name: 'Safari', value: 10 },
  { name: 'Edge', value: 5 },
  { name: 'Others', value: 5 },
];

const osData = [
  { name: 'Windows', value: 60 },
  { name: 'macOS', value: 15 },
  { name: 'Linux', value: 10 },
  { name: 'Android', value: 10 },
  { name: 'Others', value: 5 },
];

const countryData = [
  { name: 'India', value: 40 },
  { name: 'USA', value: 35 },
  { name: 'UK', value: 10 },
  { name: 'Canada', value: 10 },
  { name: 'Others', value: 5 },
];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
      <DonutChart data={browserData} title="Login By Browser (Last 30 days)" />
      <DonutChart data={osData} title="Login By OS (Last 30 days)" />
      <DonutChart data={countryData} title="Login By Country (Last 30 days)" />
    </div>
  );
}
