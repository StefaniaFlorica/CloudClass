import React, { useState } from "react";
import { useLocalState } from "../utils/useLocalStorage";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const navigate = useNavigate();

  const sendLoginRequest = () => {
    console.log("sending a request");
    const reqBody = {
      username: username,
      password: password,
    };
    fetch("api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        return response.status === 200
          ? Promise.all([response.json(), response.headers])
          : Promise.reject("Invalid login attempt!");
      })
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        window.location.href = "dashboard";
      })
      .catch((message) => {
        alert(message);
      });
  };

  const setUsernameWrapper = (event) => {
    setUsername(event.target.value);
  };
  const setPasswordWrapper = (event) => {
    setPassword(event.target.value);
  };

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
      <Container>
        <Row>
          <div className="font-link" style={{textAlign:'center', fontSize: 40}}>
            Login
          </div>
        </Row>
        <Row className="justify-content-center">
          <Col md="8" lg="4">
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter username"
                value={username}
                onChange={setUsernameWrapper}
                style={{ backgroundColor: "rgba(194,194,223,0.692)"}}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8" lg="4">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={setPasswordWrapper}
                style={{ backgroundColor: "rgba(205,194,220,0.692)"}}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col
            md="8"
            lg="4"
            className="mt-2 d-flex flex-column gap-2 flex-md-row justify-content-md-between"
          >
            <Button id="submit" type="button" onClick={sendLoginRequest}>
              Log in
            </Button>
            <Button
              variant="secondary"
              id="exit"
              type="button"
              onClick={()=>{navigate("/")}}
            >
              Exit
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
