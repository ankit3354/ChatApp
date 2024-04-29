import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

function PrivateRouting() {
    
  const { user } = useAuth();

  return <>{user ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default PrivateRouting;
