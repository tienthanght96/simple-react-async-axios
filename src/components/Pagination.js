import React from "react";
const Pagination = ({ currentPage, total, onChange }) => {
  return (
    <nav>
      <ul className="pagination">
        {Array.from(Array(total).keys()).map(i => (
          <li
            className={`page-item ${i == currentPage ? "active" : ""}`}
            key={i}
          >
            <a
              className="page-link"
              href=""
              onClick={e => {
                e.preventDefault();
                onChange(i);
              }}
            >
              {i + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Pagination;
