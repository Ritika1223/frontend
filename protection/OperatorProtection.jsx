import { Navigate, Outlet } from 'react-router-dom';

const OperatorProtection = () => {
  const token = localStorage.getItem('O_token');

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default OperatorProtection;
