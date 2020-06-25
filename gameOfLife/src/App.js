import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import produce from "immer";
import Grid from "./lib/sketch";

const numRows = 5;
const numCols = 5;

const createEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const operation = Array(9)
  .fill(1)
  .map((i, k) => [Math.floor(k / 3) - 1, (k % 3) - 1]);
console.log(operation);
console.log(operation[0]);

function App() {
  const [generation, setGeneration] = useState(0);
  const [grid, setGrid] = useState(() => {
    return createEmptyGrid();
  });
  const [running, setRunning] = useState();
  const [stopping, setStopping] = useState(true);
  const [count, setCount] = useState(0);
  const runningRef = useRef(running);

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g, gCopy) => {
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          let neighbors = 0;
          // find each cell's neighbors
          operation.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
              neighbors += g[newI][newJ];
            }
          });
          if (neighbors > 3 || neighbors < 2) {
            gCopy[i][j] = 0;
          } else if (g[i][j] === 0 && neighbors === 3) {
            gCopy[i][j] = 1;
          }
        }
      }
    });
    setTimeout(runSimulation, document.getElementById("speed").value * 100);
  }, []);

  useEffect(() => {
    if (!stopping) {
      // set a clock
      const id = window.setInterval(() => {
        setCount((count) => count + 1);
      }, document.getElementById("speed").value * 100);

      return () => window.clearInterval(id);
    }
  }, [stopping]);
  return (
    <div className="app">
      <h1 className="title">Conway's Game of Life</h1>
      <div className="container">
        <div className="display">
          <div className="left">
            <h2 className="generation">Generation:{count}</h2>
            <Grid className="grid"></Grid>
            <div className="btnAtBottom">
              <button className="play">Play</button>
              <button className="pause">Pause</button>
              <button className="stop">Stop</button>
            </div>
          </div>
          <div className="right">
            <div className="presetGrids">
              <div className="pre preset1"></div>
              <div className="pre preset2"></div>
              <div className="pre preset3"></div>
              <div className="pre preset4"></div>
            </div>
            <div className="presetButtons">
              <button className="preBtn">Preset 1</button>
              <button className="preBtn">Preset 2</button>
              <button className="preBtn">Preset 3</button>
              <button className="preBtn">Preset 4</button>
            </div>
          </div>
        </div>
        <div className="rulesAndAbout">
          <div className="rules">
            <h2 className="ruleTitle">Rules:</h2>
            <div className="rulesContent">
              <ul>
                <li>
                  Any live cell with fewer than two live neighbours dies, as if
                  by underpopulation.
                </li>
                <li>
                  Any live cell with two or three live neighbours lives on to
                  the next generation.
                </li>
                <li>
                  Any live cell with more than three live neighbours dies, as if
                  by overpopulation.
                </li>
                <li>
                  Any dead cell with exactly three live neighbours becomes a
                  live cell, as if by reproduction.
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h2 className="about">About</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              pulvinar turpis sed ipsum porta eleifend. Phasellus ornare in
              metus et convallis. Quisque eu laoreet urna, quis pellentesque
              ipsum. Vestibulum rhoncus, sapien sit amet pellentesque finibus,
              orci quam lobortis purus, quis commodo odio elit eu neque. Aenean
              finibus elit ac molestie iaculis. Nullam ac sapien cursus, tempus
              augue at, iaculis nulla. Etiam a nisi varius, placerat sapien sed,
              finibus libero.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              pulvinar turpis sed ipsum porta eleifend. Phasellus ornare in
              metus et convallis. Quisque eu laoreet urna, quis pellentesque
              ipsum. Vestibulum rhoncus, sapien sit amet pellentesque finibus,
              orci quam lobortis purus, quis commodo odio elit eu neque. Aenean
              finibus elit ac molestie iaculis. Nullam ac sapien cursus, tempus
              augue at, iaculis nulla. Etiam a nisi varius, placerat sapien sed,
              finibus libero.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
