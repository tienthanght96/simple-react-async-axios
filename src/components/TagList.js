import React from "react";

const TagList = ({ tagList, removeTag }) =>
  tagList &&
  Array.isArray(tagList) &&
  tagList.length > 0 && (
    <div className="tag-list">
      {tagList.map((tag, index) => (
        <span className="tag-default tag-pill" key={index}>
          <i
            className="ion-close-round"
            onClick={() => {
              typeof removeTag === "function" && removeTag(index);
            }}
          />
          {tag}
        </span>
      ))}
    </div>
  );
export default TagList;
