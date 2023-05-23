import React, { useEffect, useRef, useState } from "react";
import { useLocalState } from "../utils/useLocalStorage";
import ajax from "../services/fetchService";
import {
  getAssignmentById,
  updateAssignmentById,
} from "../services/assignmentService";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import StatusBadge from "./statusBadge";
import { useNavigate } from "react-router-dom";
import {
  addComment,
  getCommentsByAssignmentId,
} from "../services/commentService";
import Comment from "./comment";

const CodeReviewerAssignmentView = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const assignmentId = window.location.href.split("/assignments/")[1];
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
    number: null,
    status: null,
  });
  const [text, setText] = useState("");
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({
    text: "",
    assignmentId: assignmentId !== null ? parseInt(assignmentId) : null,
    createdBy: jwt,
  });

  const previousAssignmentValue = useRef(assignment);
  const navigate = useNavigate();

  const persist = () => {
    updateAssignmentById(assignmentId, jwt, assignment).then(
      (assignmentData) => {
        setAssignment(assignmentData);
      }
    );
  };
  useEffect(() => {
    getAssignmentById(assignmentId, jwt).then((assignmentResponse) => {
      console.log(assignmentResponse);
      setAssignment(assignmentResponse.assignment);
      setAssignmentEnums(assignmentResponse.assignmentEnums);
      setAssignmentStatuses(assignmentResponse.statusEnums);
      console.log("use effect ", assignmentResponse.assignment);
    });
    getCommentsByAssignmentId(jwt, assignmentId).then((commentsResponse) => {
      setComments(commentsResponse);
    });
  }, []);
  useEffect(() => {
    console.log("change", assignment.branch);
    if (previousAssignmentValue.current.status !== assignment.status) {
      persist();
      console.log("din use uefect");
    }
    previousAssignmentValue.current = assignment;
  }, [assignment.status]);

  const updateAssignment = (prop, value) => {
    if (prop === "codeReviewUrl") {
      console.log(value);
    }
    const newAssignmnent = { ...assignment };
    newAssignmnent[prop] = value;
    setAssignment(newAssignmnent);
  };

  const handleOnSubmit = async (status) => {
    // console.log("on submit", assignment);
    // if (
    //   assignment.status === assignmentStatuses[0].status &&
    //   assignment.branch !== null &&
    //   assignment.githubUrl !== null
    // ) {
    //   updateAssignment("status", assignmentStatuses[1].status);
    // } else {
    //   persist();
    // }

    if (status && assignment.status !== status) {
      updateAssignment("status", status);
    } else {
      persist();
    }
  };

  const changeSelectedAssignment = (selectedValue) => {
    updateAssignment("number", selectedValue);
  };

  const submitComment = () => {
    addComment(jwt, comment).then((commentData) => {
      setComments([...comments, commentData]);
      setText("");
    });
  };
  const updateCommentState = (value) => {
    setComment({ ...comment, text: value });
    setText(value);
  };
  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          {assignment.number ? <h1> Assignment {assignment.number}</h1> : <></>}
        </Col>
        <Col>
          <StatusBadge text={assignment.status} />
        </Col>
      </Row>

      {assignment ? (
        <>
          <Form.Group as={Row} className="my-3" controlId="githubUrl">
            <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
              GitHub URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
                disabled={true}
                value={assignment?.githubUrl}
                onChange={(event) =>
                  updateAssignment("githubUrl", event.target.value)
                }
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="branch">
            <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
              Branch:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
                disabled={true}
                value={assignment?.branch}
                onChange={(event) =>
                  updateAssignment("branch", event.target.value)
                }
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="branch">
            <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
              Video Review URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
                disabled={assignment.status === "Completed" ? true : false}
                value={assignment?.codeReviewUrl}
                onChange={(event) =>
                  updateAssignment("codeReviewUrl", event.target.value)
                }
              />
            </Col>
          </Form.Group>
          <div className="d-flex gap-5">
            {assignment.status === "Completed" ? (
              // <Button
              //   className="shadow mb-5 rounded"
              //   size="lg"
              //   variant="info"
              //   onClick={() => handleOnSubmit(assignmentStatuses[2].status)}
              // >
              //   Re-Claim
              // </Button>
              <></>
            ) : (
              <Button
                disabled={assignment.status === "Needs Update"}
                className="shadow mb-5 rounded"
                size="lg"
                onClick={() => handleOnSubmit(assignmentStatuses[4].status)}
              >
                Complete Review
              </Button>
            )}

            {assignment.status === "Needs Update" ? (
              <Button
                className="shadow mb-5 rounded"
                size="lg"
                variant="info"
                onClick={() => handleOnSubmit(assignmentStatuses[2].status)}
              >
                Re-Claim
              </Button>
            ) : assignment.status !== "Completed" ? (
              <Button
                className="shadow mb-5 rounded"
                size="lg"
                variant="danger"
                onClick={() => handleOnSubmit(assignmentStatuses[3].status)}
              >
                Reject Assignment
              </Button>
            ) : (
              <></>
            )}

            <Button
              className="shadow mb-5 rounded"
              size="lg"
              variant="secondary"
              onClick={() => navigate("/dashboard")}
            >
              Back
            </Button>
          </div>
          <div className="">
            <textarea
              value={text}
              style={{ width: "100%", borderRadius: "0.25em" }}
              onChange={(event) => updateCommentState(event.target.value)}
            ></textarea>
            <Button
              className="shadow mt-3 rounded"
              size="medium"
              variant="primary"
              onClick={submitComment}
            >
              Post Comment
            </Button>
          </div>
          <div className="h3 mt-5 fw-bold">Comments Section</div>
          <div className="mt-5">
            {comments.map((comment) => (
              <Comment comment={comment} />
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default CodeReviewerAssignmentView;
