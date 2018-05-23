import React from "react";
import { map } from "../utils/object";
export const renderErrormessage = errors =>
  errors && (
    <ul className="error-messages">
      {map(errors, (errList, key) =>
        errList.map((errMessage, i) => (
          <li key={i}>
            {key} {errMessage}
          </li>
        ))
      )}
    </ul>
  );
