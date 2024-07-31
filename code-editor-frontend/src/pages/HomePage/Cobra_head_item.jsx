import React from "react";
import "./cobraHeader.css"; // Ensure the CSS file is imported

const Cobra_head_item = ({ language, onDelete, onClick, onDownload }) => {
  return (
    <div className="cobra-head-item" onClick={onClick}>
      <p>{language}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        Delete
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDownload();
        }}
        className="download-button" // Apply the CSS class here
      >
        Download
      </button>
    </div>
  );
};

export default Cobra_head_item;
