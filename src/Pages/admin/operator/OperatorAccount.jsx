import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OperatorAccount = () => {
  const { operatorId } = useParams(); // get the operator ID from the URL
  const [operatorData, setOperatorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Example API call, replace with your real API URL
    fetch(`/api/operators/${operatorId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch operator data');
        return res.json();
      })
      .then((data) => {
        setOperatorData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [operatorId]);

  if (loading) return <div>Loading operator credentials...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!operatorData) return <div>No operator data found.</div>;

  return (
    <div>
      <h1>Operator Account Details</h1>
      <p><strong>Name:</strong> {operatorData.name}</p>
      <p><strong>Email:</strong> {operatorData.email}</p>
      <p><strong>Phone:</strong> {operatorData.phone}</p>
      <p><strong>Assigned Credentials:</strong> {operatorData.credentials}</p>
      {/* Add other fields as needed */}
    </div>
  );
};

export default OperatorAccount;
