import { useLocalState } from "../utils/useLocalStorage";
import jwt_decode from "jwt-decode";
import Dashboard from "./dashboard";
import CodeReviewerDashboard from "./codeReviewerDashboard";
import { useEffect, useState } from "react";

export const DashboardFactory = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if(!jwt) return;
    const decodedJwt = jwt_decode(jwt);
    setRoles(decodedJwt.authorities);
  }, []);

  return roles.find((item) => item === "ROLE_CODE_REVIEWER") ? (
    <CodeReviewerDashboard />
  ) : (
    <Dashboard />
  );
};
