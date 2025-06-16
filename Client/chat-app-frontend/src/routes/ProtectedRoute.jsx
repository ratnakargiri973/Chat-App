
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleAuth } from '../token/Auth';

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const result = await handleAuth(dispatch);
      setIsAuthenticated(result);
      setAuthChecked(true);
    };

    verifyAuth();
  }, [dispatch]);

  if (!authChecked) {
    return <p>Checking authentication...</p>; 
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/log-in" />;
};

export default ProtectedRoute;
