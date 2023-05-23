import React, { createContext } from "react";
import { useLocalState } from "./useLocalStorage";

const UserContext = createContext();
const UserProvider = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  return <UserContext.Provider value={jwt} />;
};

export {UserProvider};
