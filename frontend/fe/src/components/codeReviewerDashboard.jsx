import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useLocalState } from "../utils/useLocalStorage";
import { Link } from "react-router-dom";
import {
  createNewAssignment,
  getAssignments,
  updateAssignmentById,
} from "../services/assignmentService";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import StatusBadge from "./statusBadge";

const CodeReviewerDashboard = ({ props }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  const [assignments, setAssignments] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getAssignments(jwt).then((assignmentsData) => {
      setAssignments(assignmentsData);
    });
  }, []);

  const onClaim = (assignment) => {
    const decodedJwt = jwt_decode(jwt);
    const user = {
      username: decodedJwt.sub,
      authorities: decodedJwt.authorities,
    };
    assignment.codeReviewer = user;
    assignment.status = "In Review";
    updateAssignmentById(assignment.id, jwt, assignment).then((assignment) => {
      getAssignments(jwt).then((assignmentsData) => {
        setAssignments(assignmentsData);
      });
    });
  };

  const editReview = (assignment) => {
    navigate(`/assignments/${assignment.id}`);
  };

  return (
    <div
      className="box3"
      style={{
        height: "100vh",
        padding: 20,
      }}
    >
      <Container>
        <Row>
          <Col>
            <div className="h1">Code Reviewer Dashboard</div>
          </Col>
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
        <div className="assignment-wrapper in-review">
          <div className="h3 px-2 assignment-wrapper-title">In Review</div>
          {assignments ? (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
            >
              {assignments
                .filter((assignment) => assignment.status === "In Review")
                .map((assignment) => (
                  <Card
                    className="shadow mb-5 rounded"
                    key={assignment.id}
                    style={{
                      width: "20em",
                      height: "21em",
                      backgroundColor: "#fff1f3",
                    }}
                  >
                    <Card.Body className="d-flex flex-column justify-content-around">
                      <Card.Title
                        style={{
                          textAlign: "center",
                          marginBottom: 10,
                          fontWeight: "bolder",
                          color: "#800000",
                        }}
                      >{`Assignment #${assignment.number}`}</Card.Title>
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
                        {assignment?.user ? (
                          <p>
                            <b>By: </b>
                            <i>{assignment?.user?.name}</i>
                          </p>
                        ) : (
                          <></>
                        )}
                      </Card.Text>
                      <Button
                        className="shadow-sm rounded"
                        variant="secondary"
                        onClick={() => editReview(assignment)}
                      >
                        Edit Review
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="assignment-wrapper submitted">
          <div className="h3 px-2 assignment-wrapper-title">
            Awaiting review
          </div>
          {assignments ? (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
            >
              {assignments
                .filter(
                  (assignment) =>
                    assignment.status === "Submitted" ||
                    assignment.status === "Resubmitted"
                )
                .sort((a, b) => {
                  if (a.status === "Resubmitted") {
                    return -1;
                  }
                  return 1;
                })
                .map((assignment) => (
                  <Card
                    className="shadow mb-5 rounded"
                    key={assignment.id}
                    style={{
                      width: "20em",
                      height: "21em",
                      backgroundColor: "#fff1f3",
                    }}
                  >
                    <Card.Body className="d-flex flex-column justify-content-around">
                      <Card.Title
                        style={{
                          textAlign: "center",
                          marginBottom: 10,
                          fontWeight: "bolder",
                          color: "#800000",
                        }}
                      >{`Assignment #${assignment.number}`}</Card.Title>
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
                        {assignment?.user ? (
                          <p>
                            <b>By: </b>
                            <i>{assignment?.user?.name}</i>
                          </p>
                        ) : (
                          <></>
                        )}
                      </Card.Text>
                      <Button
                        className="shadow-sm rounded"
                        variant="secondary"
                        onClick={() => onClaim(assignment)}
                      >
                        Claim
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="assignment-wrapper needs-update">
          <div className="h3 px-2 assignment-wrapper-title">Needs Update</div>
          {assignments ? (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
            >
              {assignments
                .filter((assignment) => assignment.status === "Needs Update")
                .map((assignment) => (
                  <Card
                    className="shadow mb-5 rounded"
                    key={assignment.id}
                    style={{
                      width: "20em",
                      height: "21em",
                      backgroundColor: "#fff1f3",
                    }}
                  >
                    <Card.Body className="d-flex flex-column justify-content-around">
                      <Card.Title
                        style={{
                          textAlign: "center",
                          marginBottom: 10,
                          fontWeight: "bolder",
                          color: "#800000",
                        }}
                      >{`Assignment #${assignment.number}`}</Card.Title>
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
                        {assignment?.user ? (
                          <p>
                            <b>By: </b>
                            <i>{assignment?.user?.name}</i>
                          </p>
                        ) : (
                          <></>
                        )}
                      </Card.Text>
                      <Button
                        className="shadow-sm rounded"
                        variant="secondary"
                        onClick={() => {
                          navigate(`/assignments/${assignment.id}`);
                        }}
                      >
                        View
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CodeReviewerDashboard;
