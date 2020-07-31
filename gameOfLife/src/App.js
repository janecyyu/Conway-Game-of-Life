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

  const [running, setRunning] = useState(false);
  const [on, setOn] = useState(true);
  const [stopping, setStopping] = useState(true);
  const [count, setCount] = useState(0);
  const [speed, setSpeed] = useState(100);
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

            // will die if neighbors less than 2 or more than three, neighbors including self
            if (neighbors > 4 || neighbors < 3) {
              // console.log(g[i][j]);
              // console.log(">3", neighbors);
              gridCopy[i][j] = 0;
            }

            // will get life if you have three neighbors but you don't have life yet
            if (g[i][j] === 0 && neighbors === 3) {
              // console.log(g[i][j]);
              // console.log("add", neighbors);
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });
    // repeat every "speed" time
    setTimeout(runSimulation, speed);
  }, []);

  // run if the state of stopping is false
  useEffect(() => {
    if (!stopping) {
      // set a clock to increasing counting, running time depends on the state of speed
      const id = window.setInterval(() => {
        setCount((count) => count + 1);
      }, speed);
      // set counter to zero
      return () => window.clearInterval(id);
    }
  }, [stopping]);
  return (
    <div className="app">
      <h1 className="title">
        Conway's Game of Life
        <a
          href="https://github.com/janecyyu/Conway-Game-of-Life/tree/master"
          class="fa fa-github"
          target="blank"
        ></a>
      </h1>
      <div className="container">
        <div className="display">
          <div className="left">
            <h2 className="generation">Generation: {count}</h2>
            <div
              className="grid"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${numCols}, 20px)`,
              }}
            >
              {grid.map((rows, i) =>
                rows.map((col, k) => (
                  <button
                    className="cells"
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
                      backgroundColor: grid[i][k] ? "#ff6699" : "#b3b3b3",
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
                    setRunning(true);
                    runningRef.current = true;
                    runSimulation();
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
                    setRunning(false);
                    runningRef.current = false;
                    setOn(true);
                    setStopping(true);
                  }}
                >
                  Stop
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
            </div>
          </div>
          <div className="right">
            <div className="presetButtons">
              <button
                className="preBtn"
                onClick={() => {
                  const newGrid = produce(grid, (gridCopy) => {
                    // if cells alive, gridCopy get 1
                    for (let i = 8; i < 18; i++) {
                      gridCopy[11][i] = 1;
                    }
                  });
                  setGrid(newGrid);
                }}
              >
                10 Cell Row
              </button>
              <button
                className="preBtn"
                onClick={() => {
                  const newGrid = produce(grid, (gridCopy) => {
                    // if cells alive, gridCopy get 1
                    grid[10][12] = 1;
                    for (let i = 11; i < 14; i++) {
                      gridCopy[11][i] = 1;
                    }
                    grid[12][11] = 1;
                    grid[12][13] = 1;
                    grid[13][12] = 1;
                  });
                  setGrid(newGrid);
                }}
              >
                Small Exploder
              </button>
              <button
                className="preBtn"
                onClick={() => {
                  const newGrid = produce(grid, (gridCopy) => {
                    // if cells alive, gridCopy get 1
                    for (let i = 9; i < 14; i++) {
                      gridCopy[i][10] = 1;
                    }
                    gridCopy[9][12] = 1;
                    gridCopy[13][12] = 1;
                    for (let i = 9; i < 14; i++) {
                      gridCopy[i][14] = 1;
                    }
                  });
                  setGrid(newGrid);
                }}
              >
                Exploder
              </button>
              <button
                className="preBtn"
                onClick={() => {
                  const newGrid = produce(grid, (gridCopy) => {
                    // if cells alive, gridCopy get 1
                    grid[10][12] = 1;
                    grid[11][13] = 1;
                    for (let i = 11; i < 14; i++) {
                      gridCopy[12][i] = 1;
                    }
                  });
                  setGrid(newGrid);
                }}
              >
                Glider
              </button>
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
              The Game of Life is a cellular automaton devised by the British
              mathematician John Horton Conway in 1970. It is a zero-player
              game, meaning that its evolution is determined by its initial
              state, requiring no further input.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
