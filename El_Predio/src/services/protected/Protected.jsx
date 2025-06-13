import { Navigate } from "react-router-dom";
import { useAuth } from "../authcontext/AuthContext";

const Protected = ({ roles, children }) => {
  const { userRole, isAuthenticated } = useAuth();

  // Esperar hasta que el rol esté determinado (previene render apresurado)
if (isAuthenticated && userRole === null) return null;

    console.log("Rol del usuario: ", userRole);


  if (!isAuthenticated) return <Navigate to="/" />;

  if (!roles.includes(userRole)) return <Navigate to="/" />;

  return children;
};

export default Protected;
