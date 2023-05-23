import React, { useEffect, useState } from "react";
import { useLocalState } from "../utils/useLocalStorage";
import { Link } from "react-router-dom";
import {
  createNewAssignment,
  getAssignments,
} from "../services/assignmentService";
import { Button, Card, Col, Row } from "react-bootstrap";
import StatusBadge from "./statusBadge";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Dashboard = ({ props }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  const [decodedJwt, setDecodedJwt] = useState(null);
  const [assignments, setAssignments] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    getAssignments(jwt).then((assignmentsData) => {
      setAssignments(assignmentsData);
    });
    if (!jwt) return;
    setDecodedJwt(jwt_decode(jwt));
  }, []);

  const createAssignment = () => {
    createNewAssignment(jwt).then((assignment) => {
      console.log(assignment);
      navigate(`/assignments/${assignment.id}`);
    });
  };

  const onEditClick = (assignmentId) => {
    navigate(`/assignments/${assignmentId}`);
  };

  // useEffect(() => {
  //   if (jwt === null) {
  //     navigate("/login");
  //   }
  // }, [jwt]);

  return (
    <div
      className="box2 hh"
      style={{
        padding: 20,
      }}
    >
      <Row>
        <Col>
          <div
            className="d-flex justify-content-end"
            style={{ cursor: "pointer", color: "black", fontWeight: "bold" }}
            onClick={() => {
              setJwt(null);
              localStorage.removeItem("jwt");
              navigate("/login");
            }}
          >
            Logout
          </div>
        </Col>
      </Row>
      <div
        className={
          "mb-5 mt-3 d-flex flex-row gap-5 align-items-center justify-content-between"
        }
      >
        <div className="h2 fw-bold">{`Hi, ${decodedJwt?.sub}!`}</div>
        <div>
          <Button
            className="shadow-sm rounded"
            size="lg"
            onClick={createAssignment}
            style={{
              backgroundColor: "	#800000",
              borderColor: "	#800000",
              color: "#fff1f3",
            }}
          >
            {" "}
            Submit New Assignment
          </Button>
        </div>
      </div>
      {assignments ? (
        <div
          className="d-grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
        >
          {assignments.map((assignment) => (
            <Card
              className="shadow mb-5 rounded"
              key={assignment.id}
              style={{
                width: "20em",
                height: "22em",
                backgroundColor: "#fff1f3",
              }}
            >
              <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title
                  style={{
                    textAlign: "center",
                    marginBottom: 20,
                    fontWeight: "bolder",
                    color: "#800000",
                  }}
                >{`Assignment ${assignment.number}`}</Card.Title>
                <div className="d-flex align-items-start">
                  <StatusBadge text={assignment.status} />
                </div>

                <Card.Text>
                  <p>
                    <b>GitHub URL: </b>
                    {assignment.githubUrl}
                  </p>
                  <p>
                    <b>Branch: </b>
                    {assignment.branch}
                  </p>
                  {assignment?.codeReviewer ? (
                    <p>
                      <b>Picked by: </b>
                      <i>{assignment?.codeReviewer?.name}</i>
                    </p>
                  ) : (
                    <></>
                  )}
                </Card.Text>
                <Button
                  className="shadow-sm rounded"
                  variant="secondary"
                  onClick={() => onEditClick(assignment.id)}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
