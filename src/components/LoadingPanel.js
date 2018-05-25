import React from "react";
export default (props) => {
  const { text } = props;
  return <div className="loading-panel">{text || "Loading"}...</div>;
};
