import React, { useState } from "react";
import { useLocalState } from "../utils/useLocalStorage";
import { Navigate } from "react-router-dom";
import { validateToken } from "../services/authService";

const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  if (jwt && jwt!=="") {
    console.log("this is the jwt",jwt)
    validateToken(jwt).then((isValidVal) => {
      setIsValid(isValidVal);
      setIsLoading(false);
    });
  } else {
    return <Navigate to="/login" />;
  }
  return isLoading ? (
    <div>Loading...</div>
  ) : isValid ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
