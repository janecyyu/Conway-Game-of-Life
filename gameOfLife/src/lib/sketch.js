import React, { useState } from "react";
import Cell from "./cell";

function Grid(props) {
  const [array, setArray] = useState([]);
  var rows = [];
  let id = 0;
  let key = 0;
  for (var y = 0; y < 5; y++) {
    var cells = [];
    for (var x = 0; x < 5; x++) {
      cells.push(
        <Cell start={props.start} array={array} key={key++} id={id++} />
      );
    }
    rows.push(<tr key={y}>{cells}</tr>);
  }

  return <table className="grid">{<tbody>{rows}</tbody>}</table>;
}
export default Grid;
