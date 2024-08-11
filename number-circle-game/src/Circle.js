import React from "react";
import "./Circle.css";

function Circle({ number, x, y, onClick }) {
  const style = {
    right: `${x}px`,
    top: `${y}px`,
  };

  return (
    <div className="circle" style={style} onClick={() => onClick(number)}>
      {number}
    </div>
  );
}

export default Circle;
