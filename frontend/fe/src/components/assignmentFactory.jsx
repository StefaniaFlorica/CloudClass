import { useLocalState } from "../utils/useLocalStorage";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import CodeReviewerAssignmentView from "./assignmentCodeReviewer";
import React from "react";
import AssignmentView from "./assignment";

export const AssignmentFactory = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (!jwt) return;
    const decodedJwt = jwt_decode(jwt);
    setRoles(decodedJwt.authorities);
  }, []);

  return roles.find((item) => item === "ROLE_CODE_REVIEWER") ? (
    <CodeReviewerAssignmentView />
  ) : (
    <AssignmentView />
  );
};
