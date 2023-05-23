import React from "react";
import { Badge } from "react-bootstrap";

const withColorDecorator = (WrappedComponent) => {
  return (props) => {
    const { text } = props;

    const getBadgeColor = () => {
      switch (text) {
        case "Pending Submission":
          return "warning";
        case "Completed":
          return "success";
        case "In Review":
          return "info";
        case "Needs Update":
          return "danger";
        case "Resubmitted":
          return "primary";
        default:
          return "info";
      }
    };

    const badgeColor = getBadgeColor();

    return (
      <WrappedComponent
        {...props}
        badgeColor={badgeColor}
      />
    );
  };
};

const StatusBadge = (props) => {
  const { badgeColor } = props;

  return (
    <Badge
      pill
      bg={badgeColor}
      className="shadow-sm rounded"
      style={{ fontSize: "1em", marginBottom: 20 }}
    >
      {props.text}
    </Badge>
  );
};

export default withColorDecorator(StatusBadge);
