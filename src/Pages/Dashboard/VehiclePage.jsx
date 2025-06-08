import React, { useEffect, useState } from 'react';
import API_URLS from '../../ApIURLs';

const VehiclePage = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBusNumber, setNewBusNumber] = useState('');
  const [selectedBusId, setSelectedBusId] = useState(null);

  const operatorData = JSON.parse(localStorage.getItem('userData'));
  const operatorId = operatorData?.id;
 // ✅ Move fetchVehicles OUTSIDE useEffect so it can be reused
  const fetchVehicles = async () => {
    try {
      if (!operatorId) return;
      setLoading(true);
      const res = await fetch(`${API_URLS.VEHICLES}?operatorId=${operatorId}`);
      const data = await res.json();
      setBuses(data || []);
    } catch (err) {
      console.error('Error fetching buses:', err);
      setBuses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [operatorId]);

  const handleAddBusNumber = async (busId) => {
    if (!newBusNumber) return alert("Please enter a bus number.");

    try {
      const response = await fetch(`${API_URLS.ADD_BUS_NUMBER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operatorId, busId, busNumber: newBusNumber })
      });

      if (!response.ok) throw new Error("Failed to add bus number");

      // ✅ Instead of depending on returned data, refetch from DB
      await fetchVehicles();

      setNewBusNumber('');
      setSelectedBusId(null);
    } catch (err) {
      console.error('Add Bus Number Error:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Vehicles</h2>

      {loading ? (
        <p>Loading...</p>
      ) : buses.length === 0 ? (
        <p>No buses found.</p>
      ) : (
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Bus Type</th>
              <th className="px-4 py-2 border">Bus Models</th>
              <th className="px-4 py-2 border">Bus Numbers</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus, index) => (
              <tr key={bus._id || index}>
                <td className="px-4 py-2 border">{bus.busType}</td>
                <td className="px-4 py-2 border">
                  {Array.isArray(bus.busModel) ? bus.busModel.join(', ') : bus.busModel}
                </td>
                <td className="px-4 py-2 border">
                  {bus.busNumbers?.join(', ') || 'No numbers yet'}
                </td>
                <td className="px-4 py-2 border">
                  {selectedBusId === bus._id ? (
                    <>
                      <input
                        type="text"
                        placeholder="Enter Bus Number"
                        value={newBusNumber}
                        onChange={(e) => setNewBusNumber(e.target.value)}
                        className="border px-2 py-1 mr-2"
                      />
                      <button
                        onClick={() => handleAddBusNumber(bus._id)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setSelectedBusId(bus._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Add Bus Number
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VehiclePage;
