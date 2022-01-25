import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [markerLines, setMarkerLines] = useState([]);
  const [timeBoxes, setTimeBoxes] = useState([]);
  const [mode, setMode] = useState("Marking Lines");
  const MarkerTop = 0;
  const MarkerBot = 700;
  const hours = [...Array(24).keys()];
  function arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }
  const getAboveLine = (yPos) => {
    const linesSorted = markerLines.sort((a, b) => {
      return b - a;
    });
    return linesSorted.find((line) => line < yPos);
  };
  const getBelowLine = (yPos) => {
    const linesSorted = markerLines.sort((a, b) => {
      return a - b;
    });
    return linesSorted.find((line) => line > yPos);
  };
  const handleMarkerClick = (e) => {
    if (mode === "Marking Lines") {
      setMarkerLines([...markerLines, e.clientY]);
    }
    if (mode === "Marking Time Boxes") {
      const timeBox = [
        getAboveLine(e.clientY) || MarkerTop,
        getBelowLine(e.clientY) || MarkerBot,
      ];
      const clickedExisting = timeBoxes.find((existing) => {
        return arrayEquals(existing, timeBox);
      });
      if (clickedExisting) {
        const update = timeBoxes.filter((existing) => {
          return !arrayEquals(existing, timeBox);
        });
        console.log(update);
        setTimeBoxes(update);
      } else {
        setTimeBoxes([...timeBoxes, timeBox]);
      }
    }
  };

  return (
    <div className="App">
      <div className="ModeMenu">
        <span>Clicking Mode:</span>
        <button
          className="Button"
          style={{
            background: `${mode === "Marking Lines" ? "yellow" : "black"}`,
            color: `${mode === "Marking Lines" ? "black" : "#ffffff"}`,
          }}
          onClick={() => {
            setMode("Marking Lines");
          }}
        >
          Marking Lines
        </button>
        <button
          className="Button"
          style={{
            background: `${mode === "Marking Time Boxes" ? "yellow" : "black"}`,
            color: `${mode === "Marking Time Boxes" ? "black" : "#ffffff"}`,
          }}
          onClick={() => {
            setMode("Marking Time Boxes");
          }}
        >
          Marking TimeBoxes
        </button>
      </div>
      <div className="Marker" onClick={handleMarkerClick}>
        {markerLines.map((topPos) => (
          <div
            key={topPos * Math.random()}
            className="MarkerLine"
            style={{ top: `${topPos}px` }}
          ></div>
        ))}
        {timeBoxes.map((timeBox) => (
          <div
            key={timeBox[0] + timeBox[1]}
            className="TimeBox"
            style={{
              top: `${timeBox[0]}px`,
              height: `${timeBox[1] - timeBox[0]}px`,
            }}
          ></div>
        ))}
        {hours.map((hour) => (
          <div
            key={hour * Math.random()}
            className="Hour"
            style={{ top: `${hour * 30}px` }}
          >
            {hour}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
