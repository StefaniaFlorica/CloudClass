import ajax from "./fetchService";

const URL = "/api/comments";

export const addComment = (jwt, comment) => {
  return ajax(URL, "POST", jwt, comment);
};

export const getCommentsByAssignmentId = (jwt, assignmentId) => {
  return ajax(URL + `/${assignmentId}`, "GET", jwt);
};
