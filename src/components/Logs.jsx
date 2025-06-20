import React from "react";
import PropTypes from "prop-types";
import "../styles/logs.css";

function Logs() {
  return (
    <div className="logs-container">
      <div>
        <h2 className="logs-title">Logs</h2>
        <div className="logs-content"></div>
      </div>
    </div>
  );
}

Logs.propTypes = {};

export default Logs;
