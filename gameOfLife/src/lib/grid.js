import React from "react";

const numRows = 5;
const numCols = 5;

const CreateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

export default CreateEmptyGrid();
