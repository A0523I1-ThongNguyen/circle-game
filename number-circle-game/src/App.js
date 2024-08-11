import React, { useState, useEffect } from "react";
import Circle from "./Circle";
import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [numCircles, setNumCircles] = useState(0);
  const [circles, setCircles] = useState([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timer, setTimer] = useState(0.0);
  const [intervalId, setIntervalId] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (nextNumber > numCircles) {
      setIsFinished(true);
      clearInterval(intervalId);
    } else {
      setIsFinished(false);
    }
  }, [nextNumber, numCircles, intervalId]);

  useEffect(() => {
    if (isGameOver) {
      clearInterval(intervalId);
    }
  }, [isGameOver, intervalId]);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  const handlePlayClick = () => {
    if (!isPlaying) {
      if (numCircles <= 0) {
        toast.error("Number must be greater than 0", {
          autoClose: 1000,
        });
        return;
      }
      const newCircles = Array.from({ length: numCircles }, (_, i) => ({
        number: i + 1,
        visible: true,
        x: Math.random() * 250,
        y: Math.random() * 250,
      }));
      setCircles(newCircles);
      setNextNumber(1);
      setIsPlaying(true);
      setIsGameOver(false);
      setTimer(0.0); // Reset the timer
      const id = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 0.1);
      }, 100);
      setIntervalId(id);
    } else {
      // Clear the previous interval
      clearInterval(intervalId);
      const updatedNumCircles = numCircles;
      const newCircles = Array.from({ length: updatedNumCircles }, (_, i) => ({
        number: i + 1,
        visible: true,
        x: Math.random() * 200,
        y: Math.random() * 200,
      }));
      setCircles(newCircles);
      setNextNumber(1);
      setIsGameOver(false);
      setTimer(0.0); // Reset the timer
      const id = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 0.1);
      }, 100);
      setIntervalId(id);
    }
  };

  const handleCircleClick = (number) => {
    if (!isGameOver && number === nextNumber) {
      const updatedCircles = circles.map((circle) =>
        circle.number === number ? { ...circle, visible: false } : circle
      );
      setCircles(updatedCircles);
      setNextNumber(nextNumber + 1);
    } else if (isGameOver) {
      toast.error("Game Over!", {
        autoClose: 1000,
      });
    } else {
      setIsGameOver(true);
    }
  };

  return (
    <>
      <div className="App">
        <h1>Game Random Number</h1>
        <div>
          <input
            type="number"
            min="0"
            value={numCircles}
            onChange={(event) => setNumCircles(event.target.value)}
            placeholder="enter number..."
          />
          <button onClick={() => handlePlayClick(numCircles)}>
            {isPlaying ? "Restart" : "Play"}
          </button>
        </div>
        <h3>
          {isFirstRender ? (
            "Let's Go"
          ) : isFinished ? (
            <span className="all-cleared">All Cleared</span>
          ) : isGameOver ? (
            <span className="over">Game Over</span>
          ) : (
            "Let's Go"
          )}
        </h3>
        {!isFirstRender && isFinished && <p> Time: {timer.toFixed(1)}s</p>}
        {!isFirstRender && !isFinished && !isGameOver && (
          <p>Time: {timer.toFixed(1)}s</p>
        )}
        {isGameOver && <p>Time: {timer.toFixed(1)}s</p>}
        <div className="circle-container">
          {circles.map(
            (circle) =>
              circle.visible && (
                <Circle
                  key={circle.number}
                  number={circle.number}
                  x={circle.x}
                  y={circle.y}
                  onClick={handleCircleClick}
                />
              )
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
