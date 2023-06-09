import React from "react";
import { Navigate } from "react-router-dom";

import { User } from "../helpers/axios";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const user: User = JSON.parse(localStorage.getItem("auth") ?? "null");
  return user ? <>{children}</> : <Navigate to="/login/" />;
};

export default ProtectedRoute;
