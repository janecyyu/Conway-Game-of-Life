import React, { useState } from "react";
import "./style.css";

function Cell() {
  let [alive, setAlive] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    if (alive == false) {
      setAlive(true);
    } else {
      setAlive(false);
    }
  };
  return <div className={alive ? "cell" : "died"} onClick={handleClick}></div>;
}
export default Cell;
