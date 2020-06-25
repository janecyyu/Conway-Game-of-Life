import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import produce from "immer";

const numRows = 25;
const numCols = 25;

const createEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    // push a new, shallow-copied array, filled with 0
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const operation = Array(9)
  .fill(1)
  .map((k, idx) => [Math.floor(idx / 3) - 1, (idx % 3) - 1]);

function App() {
  const [grid, setGrid] = useState(() => {
    return createEmptyGrid();
  });

  const [running, setRunning] = useState();
  const [on, setOn] = useState(true);
  const [stopping, setStopping] = useState(true);
  const [count, setCount] = useState(0);
  const [slow, setSlow] = useState(1000);
  const runningRef = useRef(running);

  // use useCallback instead of useEffect, because we have to get new data for setGrid()
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;

            // loop every neighbor
            operation.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;

              // will plus one if get a neighbor
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += g[newI][newJ];
              }
            });

            // will die if neighbors less than 2 or more than three
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
              // will get life if you have three neighbors but you don't have life yet
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });
    setTimeout(runSimulation, 1000);
  }, []);

  // run if the state of stopping is false
  useEffect(() => {
    if (!stopping) {
      // set a clock to increasing counting, running time depends on the state of slow
      const id = window.setInterval(() => {
        setCount((count) => count + 1);
      }, slow);
      // set counter to zero
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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${numCols}, 20px)`,
              }}
            >
              {grid.map((rows, i) =>
                rows.map((col, k) => (
                  <button
                    key={`${i}-${k}`}
                    disabled={!on}
                    onClick={() => {
                      const newGrid = produce(grid, (gridCopy) => {
                        // if cells alive, gridCopy get 1
                        gridCopy[i][k] = grid[i][k] ? 0 : 1;
                      });
                      setGrid(newGrid);
                    }}
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: grid[i][k] ? "skyblue" : undefined,
                      border: "1px solid black",
                    }}
                  />
                ))
              )}
            </div>
            <div className="btnAtBottom">
              {!running && (
                <button
                  className="play"
                  onClick={() => {
                    if (!running) {
                      runningRef.current = true;
                      runSimulation();
                    }
                    setRunning(!running);
                    setOn(false);
                    setStopping(false);
                  }}
                >
                  Play
                </button>
              )}
              {running && (
                <button
                  className="stop"
                  onClick={() => {
                    if (!running) {
                      runningRef.current = true;
                      runSimulation();
                    }
                    setRunning(!running);
                    setOn(true);
                    setStopping(true);
                  }}
                >
                  stop
                </button>
              )}
              <button
                className="clear"
                onClick={() => {
                  setGrid(createEmptyGrid());
                  setOn(true);
                  setRunning(false);
                  setCount(0);
                  setStopping(true);
                }}
              >
                Clear
              </button>
              <button onClick={() => setSlow(100)}>fast</button>
              <button onClick={() => setSlow(2000)}>slow</button>
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
              <button
                className="preBtn"
                onClick={() => {
                  const newGrid = produce(grid, (gridCopy) => {
                    // if cells alive, gridCopy get 1
                    for (let i = 10; i < 21; i++) {
                      gridCopy[10][i] = 1;
                    }
                  });
                  setGrid(newGrid);
                }}
              >
                Preset 1
              </button>
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
