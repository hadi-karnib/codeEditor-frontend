import React from 'react';
import { Button } from "@chakra-ui/react";
// import './Cobra_head_item.css';

export default function Cobra_head_item({ name, language, onDelete }) {
  return (
    <div className="cobra-head-item">
      <h1>{name}</h1>
      <h2>{language}</h2>
      <Button colorScheme="red" onClick={onDelete}>
        Delete
      </Button>
    </div>
  );
}
