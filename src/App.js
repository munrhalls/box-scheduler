import logo from "./logo.svg";
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { Hover } from "./components/Hover";

function App() {
  const [markerLines, setMarkerLines] = useState([]);
  const [timeBoxes, setTimeBoxes] = useState([]);
  const [textBoxes, setTextBoxes] = useState([]);

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
    console.log(e.clientY - 50);
    if (mode === "Marking Lines") {
      //if exists, delete, else
      setMarkerLines([...markerLines, e.clientY - 50]);
    }
    if (mode === "Marking Time Boxes") {
      const timeBox = [
        getAboveLine(e.clientY - 50) || MarkerTop,
        getBelowLine(e.clientY - 50) || MarkerBot,
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
    if (mode === "Adding Text") {
      const textBox = [
        getAboveLine(e.clientY - 50) || MarkerTop,
        getBelowLine(e.clientY - 50) || MarkerBot,
      ];
      setTextBoxes([...textBoxes, textBox]);
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
        <button
          className="Button"
          style={{
            background: `${mode === "Marking Lines" ? "yellow" : "black"}`,
            color: `${mode === "Marking Lines" ? "black" : "#ffffff"}`,
          }}
          onClick={() => {
            setMode("Adding Text");
          }}
        >
          Adding Text
        </button>
      </div>
      <div className="Marker" onClick={handleMarkerClick}>
        {markerLines.map((topPos) => (
          <Hover
            showOnHover={
              <div
                key={topPos * Math.random()}
                className="MarkerLine hover"
                style={{ top: `${topPos}px` }}
              >
                <span className="delete">x</span>
              </div>
            }
            showOnNoHover={
              <div
                key={topPos * Math.random()}
                className="MarkerLine"
                style={{ top: `${topPos}px` }}
              ></div>
            }
          ></Hover>
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
            <div className="Hour Line"></div>
          </div>
        ))}
        {textBoxes.map((textBox, index) => (
          <input key={textBox + index} className="Text">
            {textBox[3]}
          </input>
        ))}
      </div>
    </div>
  );
}

export default App;
