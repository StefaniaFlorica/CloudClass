import React, { useEffect } from "react";
import { useLocalState } from "../utils/useLocalStorage";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  const navigate = useNavigate();
  return (
    <div
      className="box"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <span className="font-link">Welcome to ClassCloud!</span>
      <Button className="shadow mb-5 rounded" size="medium" onClick={()=>{navigate("/login")}}>
        Login
      </Button>
    </div>
  );
};

export default Homepage;
