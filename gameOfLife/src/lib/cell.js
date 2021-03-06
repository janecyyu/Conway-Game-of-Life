import React, { useState, useEffect } from "react";
import "./style.css";

let select = [];
function Cell(props) {
  let [alive, setAlive] = useState(false);
  let [dying, setDying] = useState(false);
  // console.log(props.array);

  useEffect(() => {}, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (alive == false) {
      setAlive(true);
      select.push(props.id);
    } else {
      setAlive(false);
      select = select.filter((item) => item !== props.id);
    }
    console.log(props.id);
    console.log(select);
  };

  function life() {
    var target;
    select.map((item) => {
      var neighbors = 0;
      target = item;
      if (select.includes(target + 1)) {
        neighbors++;
      }
      if (select.includes(target - 1)) {
        neighbors++;
      }
      if (select.includes(target - 6)) {
        neighbors++;
      }
      if (select.includes(target - 5)) {
        neighbors++;
      }
      if (select.includes(target - 4)) {
        neighbors++;
      }
      if (select.includes(target + 4)) {
        neighbors++;
      }
      if (select.includes(target + 5)) {
        neighbors++;
      }
      if (select.includes(target + 6)) {
        neighbors++;
      }
      console.log("l", neighbors);
      if (neighbors == 1) {
        console.log("one");
      }
      if (neighbors == 2) {
        console.log("two");
      }
      // if (neighbors > 3) {
      //   return setDying(true);
      // }
      // if (neighbors < 2) {
      //   return setDying(true);
      // }
    });
    // if (neighbors > 3) {
    //   return setDying(true);
    // }
    // if (neighbors < 2) {
    //   return setDying(true);
    // }
  }
  life();

  return <div className={alive ? "cell" : "died"} onClick={handleClick}></div>;
}
export default Cell;
