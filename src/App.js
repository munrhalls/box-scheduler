import logo from "./logo.svg";
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { Hover } from "./components/Hover";

function App() {
  // sd
  const [markerLines, setMarkerLines] = useState([]);
  const [textBoxes, setTextBoxes] = useState([]);

  const makeTimeBoxes = function () {
    let timeBoxes = [];
    const elStartY = 0;
    const elEndY = 700;
    if (markerLines.length < 1) {
      timeBoxes.unshift([elStartY, elEndY]);
      return timeBoxes;
    }
    if (markerLines.length === 1) {
      timeBoxes.push([elStartY, markerLines[0]]);
      timeBoxes.push([markerLines[0], elEndY]);
      return timeBoxes;
    }
    if (markerLines.length > 1) {
      for (let i = 0; i < markerLines.length - 1; i++) {
        const timeBox = [markerLines[i], markerLines[i + 1]];
        timeBoxes.push(timeBox);
      }
      timeBoxes.unshift([elStartY, markerLines[0]]);
      timeBoxes.push([markerLines[markerLines.length - 1], elEndY]);
      return timeBoxes;
    }
  };
  const timeBoxes = makeTimeBoxes();
  const [mode, setMode] = useState("Marking Lines");
  const topBarHeight = 50;
  const markerHeight = 4;
  const markerHoverHeight = 8;
  const MarkerTop = 0;
  const MarkerBot = 700;
  const hours = [...Array(24).keys()];
  // function arrayEquals(a, b) {
  //   return (
  //     Array.isArray(a) &&
  //     Array.isArray(b) &&
  //     a.length === b.length &&
  //     a.every((val, index) => val === b[index])
  //   );
  // }
  const getAboveLine = (yPos) => {
    return markerLines.find((line) => line <= yPos);
  };
  const getBelowLine = (yPos) => {
    return markerLines.find((line) => line >= yPos);
  };
  function checkExisting(newLine) {
    let clickedExisting = undefined;
    for (let i = 0 - markerHoverHeight; i <= markerHoverHeight; i++) {
      const check = newLine + i;
      if (markerLines.includes(check)) {
        return check;
      }
    }
    return clickedExisting;
  }
  const handleMarkerClick = (e) => {
    if (mode === "Marking Lines") {
      const newLine = e.clientY - topBarHeight;

      const clickedExisting = checkExisting(newLine);
      if (clickedExisting) {
        const update = markerLines.filter((el) => {
          return el !== clickedExisting;
        });
        const sorted = update.sort((a, b) => {
          return a - b;
        });
        setMarkerLines(sorted);
      } else {
        const update = [...markerLines, newLine];
        const sorted = update.sort((a, b) => {
          return a - b;
        });
        setMarkerLines(sorted);
      }
    }
    if (mode === "Marking Time Boxes") {
      const range = [
        getAboveLine(e.clientY - topBarHeight) || MarkerTop,
        getBelowLine(e.clientY - topBarHeight) || MarkerBot,
      ];

      // // let clickedExisting = timeBoxes.find((existing) => {
      // //   return arrayEquals(existing, timeBox);
      // // });
      // const boxBottoms = timeBoxes.filter(
      //   (el) => el === e.clientY - topBarHeight
      // );
      // console.log(boxBottoms);
      // setTimeBoxes([...timeBoxes, timeBox]);
    }
    // if (mode === "Adding Text") {
    //   const textBox = [
    //     getAboveLine(e.clientY - topBarHeight) || MarkerTop,
    //     getBelowLine(e.clientY - topBarHeight) || MarkerBot,
    //   ];
    //   setTextBoxes([...textBoxes, textBox]);
    // }
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
      <div className="Schedule" onClick={handleMarkerClick}>
        {markerLines.map((topPos) =>
          mode === "Marking Lines" ? (
            <Hover
              key={topPos * Math.random()}
              showOnHover={
                <div
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
          ) : (
            <div
              key={topPos * Math.random()}
              className="MarkerLine"
              style={{ top: `${topPos}px` }}
            ></div>
          )
        )}
        {timeBoxes.map((timeBox, index) => (
          <div
            key={timeBox[0] + timeBox[1]}
            className="TimeBox"
            style={{
              top: `${timeBox[0]}px`,
              height: `${timeBox[1] - timeBox[0]}px`,
              borderBottom: `${
                index === timeBoxes.length - 1 ? "4px solid #282828" : "none"
              }`,
            }}
          ></div>
        ))}
        {hours.map((hour) => (
          <div
            key={hour * Math.random()}
            className="Hour"
            style={{ top: `${hour * (696 / 24)}px` }}
          >
            {hour}
            <div className="Hour Line"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
