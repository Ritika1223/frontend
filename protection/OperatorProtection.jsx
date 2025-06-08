import { Navigate, Outlet } from 'react-router-dom';

const OperatorProtection = () => {
  const token = localStorage.getItem('O_token');

  return token ? <Outlet /> : <Navigate to="/operator-login" replace />;
};

export default OperatorProtection;
