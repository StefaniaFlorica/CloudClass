import React, { useEffect, useState } from "react";
import { useLocalState } from "../utils/useLocalStorage";
import jwt_decode from "jwt-decode";
const Comment = (props) => {
  const date = new Date(props.comment.createdDate).toLocaleString();
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [decodedJwt, setDecodedJwt] = useState(null);

  useEffect(() => {
    if (!jwt) return;
    setDecodedJwt(jwt_decode(jwt));
  }, []);
  return (
    <>
      <span style={{ fontSize: 13, color: "grey" }}>{`[${date}] `}</span>
      <div className="d-flex flex-row gap-2 align-items-center">
        {decodedJwt?.sub !== props.comment.createdBy.username ? (
          <>
            <div>
              <span style={{ fontWeight: "bold" }}>
                {props.comment.createdBy.name}
              </span>
            </div>
            <div className="comment-bubble-other">
              <span style={{ fontStyle: "italic" }}>{props.comment.text}</span>
            </div>
          </>
        ) : (
          <>
            <div className="comment-bubble-this">
              <span style={{ fontStyle: "italic" }}>{props.comment.text}</span>
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>
                {props.comment.createdBy.name}(Me)
              </span>
            </div>
          </>
        )}
      </div>

      {/* <Col>
          {" "}
          <div className="d-flex flex-row gap-5 align-items-center">
            <div className="edit-button" onClick={()=>props.emitEditComment(props.comment)}>Edit</div>
            <div className="delete-button" onClick={()=>props.emitDeleteComment(props.comment)}>Delete</div>
          </div>
        </Col> */}

      {/* <Row className="comment-bubble">
        <Col>
          <div>
            <span style={{ fontStyle: "italic" }}>{props.comment.text}</span>
          </div>
        </Col>
      </Row> */}
    </>
  );
};

export default Comment;
