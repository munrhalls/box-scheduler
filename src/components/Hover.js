import React from "react";
import "./Hover.css";

export const Hover = ({ showOnHover, showOnNoHover }) => (
  <div className="hover">
    <div className="showOnNoHover">{showOnNoHover}</div>
    <div className="showOnHover">{showOnHover}</div>
  </div>
);
