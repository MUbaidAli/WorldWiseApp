import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/LoginAuth";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthorized } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized]);

  return <>{isAuthorized ? children : null};</>;
}

export default ProtectedRoute;
