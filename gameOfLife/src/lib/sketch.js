import React from "react";
import Cell from "./cell";

function Grid() {
  var rows = [];
  for (var y = 1; y <= 25; y++) {
    var cells = [];
    for (var x = 1; x <= 25; x++) {
      cells.push(<Cell />);
    }
    rows.push(<tr key={y}>{cells}</tr>);
  }

  return <table className="grid">{<tbody>{rows}</tbody>}</table>;
}
export default Grid;
