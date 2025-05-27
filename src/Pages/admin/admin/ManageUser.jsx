import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [data, setData] = useState([]);

  // Fetch users
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:8080/api/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete user
const deleteUser = async (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this user?");
  if (!confirmed) return;

  try {
    const token = localStorage.getItem("adminToken");
    await axios.delete(`http://localhost:8080/api/auth/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Deleted user", id);
    setData((prev) => prev.filter((user) => user._id !== id));
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Manage Users</h2>

      <table className="w-full bg-white shadow-md rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left py-2 px-4">Name</th>
            <th className="text-left py-2 px-4">Email</th>
            <th className="text-left py-2 px-4">Phone</th>
            <th className="text-left py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user._id} className="border-t">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.phone}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
