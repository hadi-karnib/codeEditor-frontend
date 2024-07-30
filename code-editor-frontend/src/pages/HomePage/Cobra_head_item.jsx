import React from "react";

const Cobra_head_item = ({ name, language, onDelete, onClick }) => {
  return (
    <div className="cobra-head-item" onClick={onClick}>
      <h3>{name}</h3>
      <p>{language}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Cobra_head_item;
