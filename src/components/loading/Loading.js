
import React from "react";
import "./Loading.scss";

export default function Loading() {
  return (
    <div>
      <div className="loading">
        <svg className="spinner" viewBox="25 25 50 50">
          <circle
            className="path"
            fill="none"
            strokeWidth="4"
            strokeMiterlimit="10"
            cx="50"
            cy="50"
            r="20"
          ></circle>
        </svg>
      </div>
    </div>
  );
}
