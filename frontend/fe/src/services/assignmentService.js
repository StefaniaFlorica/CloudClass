import ajax from "./fetchService";

const URL = "/api/assignments";

export const createNewAssignment = (jwt) => {
  return ajax(URL,"POST", jwt);
}

export const getAssignments = (jwt) => {
  return ajax(URL, "GET", jwt);
};

export const getAssignmentById = (assignmentId, jwt) => {
  return ajax(URL + `/${assignmentId}`, "GET", jwt);
};

export const updateAssignmentById = (assignmentId, jwt, assignment) => {
  return ajax(URL + `/${assignmentId}`, "PUT", jwt, assignment);
};

