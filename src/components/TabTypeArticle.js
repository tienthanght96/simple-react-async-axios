import React from "react";
const TabTypeArticle = ({listTab, currentTag, onChangeTag}) => (
  (Array.isArray(listTab) && listTab.length > 0) &&
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
      {
        (Array.isArray(listTab) && listTab.length > 0) &&
          listTab.map((tab, index) => {
            return (
              <li className="nav-item" key={index}>
                <a href="" className={`nav-link ${currentTag === tab.name ? 'active' : ''}`} onClick={(e) => {
                  e.preventDefault();
                  typeof onChangeTag === 'function' && onChangeTag(tab.name)
                }}>
                  <i className="ion-pound" />{tab.name} 
                </a>
              </li>
            )
          }) 
      }
      </ul>
    </div>
);
export default TabTypeArticle;
