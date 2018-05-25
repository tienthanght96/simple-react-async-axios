import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import PaginationArticleList from './PaginationArticleList';
const ProfileArticleTab = ({ tabs, match, currentLocation, dispatch, auth }) => {
  return (
    <div>
      <div className="articles-toggle">
        <ul className="nav nav-pills outline-active">
          {Array.isArray(tabs) && tabs.length > 0 && tabs.map((tab, i) => (
            <li className="nav-item" key={i}>
              <Link
                className={`nav-link ${currentLocation === ( match.url + tab.url ) ? 'active' : ''}`}
                to={`${match.url}${tab.url}`}
              >
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {tabs.map((tab, i) => (
        <Route
            exact
            path={`${match.url}${tab.url}`}
            render={() => (
              <PaginationArticleList dispatch={dispatch} currentTag={tab.label} type="profile_page" auth={auth}/>
            )}
            key={i}
        />
    ))}
    </div>
  );
};
export default ProfileArticleTab;