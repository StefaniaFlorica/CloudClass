import React, { useEffect, useRef, useState } from "react";
import { useLocalState } from "../utils/useLocalStorage";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  addComment,
  getCommentsByAssignmentId,
} from "../services/commentService";
import Comment from "./comment";

const AssignmentView = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const assignmentId = window.location.href.split("/assignments/")[1];
  //const assignmentId = useParams();
  //console.log(assignmentId);
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
    number: null,
    status: null,
  });
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);
  const [comment, setComment] = useState({
    text: "",
    assignmentId: assignmentId !== null ? parseInt(assignmentId) : null,
    createdBy: jwt,
  });

  const navigate = useNavigate();
  const previousAssignmentValue = useRef(assignment);

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
      //setComment({...comment,text: ""})
      setText("");
    });
  };

  const updateCommentState = (value) => {
    setText(value);
    setComment({ ...comment, text: value });
  };

  const handleDeleteComment = (comment) => {
    console.log("delete", comment.id);
  };

  const handleEditComment = (comment) => {
    console.log("edit", comment.id);
  };

  return (
    <div className="d-flex box2">
      <Container className="mt-5">
        <Row className="d-flex align-items-center">
          <Col>
            {assignment.number ? (
              <h1> Assignment {assignment.number}</h1>
            ) : (
              <></>
            )}
          </Col>
          <Col>
            <StatusBadge text={assignment.status} />
          </Col>
        </Row>

        {assignment ? (
          <>
            <Form.Group as={Row} className="my-3" controlId="assignmentName">
              <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
                Assignment:
              </Form.Label>
              <Col>
                <DropdownButton
                  disabled={true}
                  as={ButtonGroup}
                  variant={"info"}
                  title={
                    assignment.number
                      ? `Assignment ${assignment.number}`
                      : "Select an assignment"
                  }
                  onSelect={changeSelectedAssignment}
                >
                  {assignmentEnums?.map((item) => (
                    <Dropdown.Item
                      key={item.assignmentNumber}
                      eventKey={item.assignmentNumber}
                    >
                      {item.assignmentName + " #" + item.assignmentNumber}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="my-3" controlId="githubUrl">
              <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
                GitHub URL:
              </Form.Label>
              <Col sm="9" md="8" lg="6">
                <Form.Control
                  disabled={
                    assignment.status === "Submitted" ||
                    assignment.status === "Resubmitted" ||
                    assignment.status === "Completed"
                  }
                  type="url"
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
                  disabled={
                    assignment.status === "Submitted" ||
                    assignment.status === "Resubmitted" ||
                    assignment.status === "Completed"
                  }
                  type="url"
                  value={assignment?.branch}
                  onChange={(event) =>
                    updateAssignment("branch", event.target.value)
                  }
                />
              </Col>
            </Form.Group>
            {assignment.codeReviewUrl && assignment.codeReviewUrl !== "" ? (
              <Form.Group
                as={Row}
                className="d-flex align-items-center mb-3"
                controlId="codeReviewUrl"
              >
                <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
                  Code Review Video URL:
                </Form.Label>
                <Col sm="9" md="8" lg="6">
                  <a
                    href={assignment.codeReviewUrl}
                    style={{ fontWeight: "bold" }}
                  >
                    {assignment.codeReviewUrl}
                  </a>
                </Col>
              </Form.Group>
            ) : (
              <></>
            )}
            {assignment.status === "Completed" ? (
              <>
                <Button
                  className="shadow mb-5 rounded"
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate("/dashboard")}
                >
                  Back
                </Button>
              </>
            ) : (
              <div className="d-flex gap-5">
                {assignment.status === "Pending Submission" ? (
                  <Button
                    className="shadow mb-5 rounded"
                    size="lg"
                    onClick={() => handleOnSubmit("Submitted")}
                  >
                    Submit assignment
                  </Button>
                ) : (
                  <Button
                    className="shadow mb-5 rounded"
                    size="lg"
                    disabled={
                      assignment.status === "Resubmitted" ||
                      assignment.status === "Submitted"
                        ? true
                        : false
                    }
                    onClick={() => handleOnSubmit("Resubmitted")}
                  >
                    Resubmit assignment
                  </Button>
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
            )}
            <div className=" align-items-center">
              <textarea
                value={text}
                style={{ width: "66%", borderRadius: "0.25em" }}
                onChange={(event) => updateCommentState(event.target.value)}
              ></textarea>
              <div>
                <Button
                  className="shadow mt-4 rounded"
                  size="medium"
                  variant="primary"
                  onClick={submitComment}
                >
                  Post Comment
                </Button>
              </div>
            </div>
            <div className="h3 mt-5 fw-bold">Comments Section</div>
            {comments.length > 0 ? (
              <div className="mt-5">
                {comments.map((comment) => (
                  <Comment comment={comment} />
                ))}
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
};

export default AssignmentView;
