import React, { useState } from "react";
import "./App.css";
import Grid from "./lib/sketch";

function App() {
  const [generation, setGeneration] = useState(0);

  return (
    <div className="app">
      <h1 className="title">Conway's Game of Life</h1>
      <div className="container">
        <div className="display">
          <div className="left">
            <h2 className="generation">Generation:{generation}</h2>
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
