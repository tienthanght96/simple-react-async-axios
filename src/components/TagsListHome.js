import React from "react";

const TagsListHome = ({ tags, onClickTag }) => {
  if (tags && Array.isArray(tags) && tags.length > 0) {
    return (
      <div className="tag-list">
        {tags.map(tag => {
          return (
            <a
              href=""
              className="tag-default tag-pill"
              key={tag}
              onClick={(e) => {
                e.preventDefault();
                typeof onClickTag === 'function' && onClickTag(tag)
              }}
            >
              {tag}
            </a>
          );
        })}
      </div>
    );
  }
  return <div>Loading Tags...</div>;
};

export default TagsListHome;