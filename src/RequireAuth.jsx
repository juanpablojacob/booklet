import { Navigate } from 'react-router';

import useAuth from './hooks/useAuth';

export default function RequireAuth({ children }) {
  const { getUser } = useAuth();
  const user = getUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
