import ajax from "./fetchService";

const URL = "/api/auth/validate";

export const validateToken = (jwt) => {
    return ajax(URL+`?token=${jwt}`, "GET", jwt);
}