import React, { useEffect, useState } from 'react';
import { Users, Car, FileText, DollarSign } from 'lucide-react';


const API_BASE_URL = 'http://localhost:8080';

const API_URLS = {
  EMPLOYEES_LIST: `${API_BASE_URL}/api/employees`,
  VEHICLES_LIST: `${API_BASE_URL}/api/vehicles`,
  BOOKINGS_LIST: `${API_BASE_URL}/api/booking`,
  CREDITS_LIST: `${API_BASE_URL}/api/credits`,
  DEBITS_LIST: `${API_BASE_URL}/api/debits`
};

const HomePage = () => {
  const [stats, setStats] = useState({
    employees: 0,
    vehicles: 0,
    bookings: 0,
    revenue: 0
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    fetchRecentActivities(); // Optional: Implement if you have activity logs
  }, []);

  const fetchDashboardData = async () => {
  try {
    const query = `?operatorId=${operatorId}`;

    const [empRes, vehRes, bookRes, credRes, debRes] = await Promise.all([
      fetch(`${API_URLS.EMPLOYEES_LIST}${query}`),
      fetch(`${API_URLS.VEHICLES_LIST}${query}`),
      fetch(`${API_URLS.BOOKINGS_LIST}${query}`),
      fetch(`${API_URLS.CREDITS_LIST}${query}`),
      fetch(`${API_URLS.DEBITS_LIST}${query}`)
    ]);

      const [employees, vehicles, bookings, credits, debits] = await Promise.all([
        empRes.json(),
        vehRes.json(),
        bookRes.json(),
        credRes.json(),
        debRes.json()
      ]);

      const totalCredit = credits.reduce((sum, c) => sum + (c.amount || 0), 0);
      const totalDebit = debits.reduce((sum, d) => sum + (d.amount || 0), 0);
      const netRevenue = totalCredit - totalDebit;

      setStats({
        employees: employees.length,
        vehicles: vehicles.length,
        bookings: bookings.length,
        revenue: netRevenue
      });

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  const fetchRecentActivities = async () => {
    // Optional: Customize or remove if not applicable
    setActivities([
      { id: 1, action: 'Fetched data from real APIs', time: 'Just now', type: 'info' }
    ]);
  };

  const statsCards = [
    { title: 'Total Employees', value: stats.employees, icon: Users, color: 'from-blue-500 to-blue-600' },
    { title: 'Total Vehicles', value: stats.vehicles, icon: Car, color: 'from-green-500 to-green-600' },
    { title: 'Active Bookings', value: stats.bookings, icon: FileText, color: 'from-yellow-500 to-yellow-600' },
    { title: 'Revenue', value: `$${stats.revenue.toFixed(2)}`, icon: DollarSign, color: 'from-purple-500 to-purple-600' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your operations.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                activity.type === 'booking' ? 'bg-blue-100 text-blue-800' :
                activity.type === 'maintenance' ? 'bg-green-100 text-green-800' :
                activity.type === 'employee' ? 'bg-purple-100 text-purple-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {activity.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
