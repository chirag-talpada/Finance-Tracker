import React, { useEffect } from "react";
import { verifyToken } from "../services/authentication";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthGuard = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!verifyToken(token)) {
      navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Component />;
};

export default AuthGuard;
