import React from 'react';
import { Navigate } from 'react-router-dom';

import { User } from '../api/auth';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const user: User = JSON.parse(localStorage.getItem("auth") ?? "null");
  console.log(user);
  return user ? <>{children}</> : <Navigate to="/login/" />;
};

export default ProtectedRoute;
