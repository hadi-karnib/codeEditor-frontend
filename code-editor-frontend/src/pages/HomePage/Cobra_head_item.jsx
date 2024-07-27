import React from 'react';
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Cobra_head_item({ name, language, onDelete }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/editor",{ state: { name, language } });
  };

  return (
    <div className="cobra-head-item" onClick={handleClick}>
      <h1>{name}</h1>
      <h2>{language}</h2>
      <Button colorScheme="red" onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}>
        Delete
      </Button>
    </div>
  );
}