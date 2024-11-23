import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface RefrshHandlerProps {
  setIsAuthenticated: (val: boolean) => void; // Corrected to return void
}

function RefrshHandler({ setIsAuthenticated }: RefrshHandlerProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true); // Set authenticated state to true
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        navigate("/home", { replace: false }); // Redirect to home if already authenticated
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefrshHandler;
