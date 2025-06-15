import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function RedirectToLang() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/uz", { replace: true });
    }
  }, [location.pathname]);

  return null;
}
