import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function AdminRoute({ children }) {
  const { user, isAdmin, authLoading } = useContext(AuthContext);

  if (authLoading) return (
    <div className='min-h-screen flex items-center justify-center text-gray-400'>
      Loading...
    </div>
  );

  if (!user || !isAdmin) return <Navigate to='/login' replace />;

  return children;
}

export default AdminRoute;
