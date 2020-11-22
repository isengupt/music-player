import * as THREE from "three";
import React, { Suspense, useState, useCallback } from "react";
import { useSprings, useSpring, animated, interpolate } from "react-spring";
import { useGesture, useDrag } from "react-use-gesture";
import Number from "./Number";
import "./styles.css";
import Slider from "./Slider";
import myJson from "./small.json";

console.log(myJson);

const initialNumber = 156.12;

const songKeys = [
  "instrumentalness",
  "danceability",
  "liveness",
  "loudness",
  "music_key",
  "acousticness",
  "music_mode",
  "tempo",
  "time_signature",
];

var colorArray = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

export default function PullRelease(props) {
  const [
    { x, y, x1, y1, x2, y2, x3, y3, op, color, move, background },
    set,
  ] = useSpring(() => ({
    x: "300px",
    y: "300px",
    x1: "300px",
    y1: "300px",
    x2: "300px",
    y2: "300px",
    x3: "300px",
    y3: "300px",
    op: 0,
    color: "#3336DC",
    background: `radial-gradient(#3336DC, transparent)`,
    move: `translateY(0px)`,
  }));
  const [pulled, setPulled] = React.useState(true);
  const [number, setCount] = React.useState(myJson[0]["instrumentalness"]);
  const [translated, setTranslate] = React.useState(10);
  const [selIndex, setSelIndex] = React.useState(0);
  const [songData, setSongData] = React.useState(null);
  const [songIndex, setSongIndex] = React.useState(0);

  React.useEffect(() => {
    setSongData(myJson);
  }, []);

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(
    ({ last, vxvy: [, vy], movement: [mx, my], cancel, canceled }) => {
      console.log(my)
      props.setScale(my)
      if (my > 30) {
        if (pulled) {
          let scale = 500;
          set({
            x: `${scale}px`,
            y: `${scale}px`,
            x1: `${scale + 25}px`,
            y1: `${scale + 25}px`,
            x2: `${scale + 100}px`,
            y2: `${scale + 100}px`,
            x3: `${scale + 200}px`,
            y3: `${scale + 200}px`,
            op: 20,
            move: `translateY(${translated}px)`,
          });
          if (translated === 40) {
            setTranslate(0);
          } else {
            setTranslate(translated + 10);
          }

          setSelIndex((selIndex + 1) % songKeys.length);

          getStats(setCount);
          // updateWithRandomNumber(setCount);
          setPulled(!pulled);
        } else {
          let scale = 300;
          set({
            x: `${scale}px`,
            y: `${scale}px`,
            x1: `${scale}px`,
            y1: `${scale}px`,
            x2: `${scale}px`,
            y2: `${scale}px`,
            x3: `${scale}px`,
            y3: `${scale}px`,
            op: 0,
            move: `translateY(${translated}px)`,
          });

          setSelIndex((selIndex + 1) % songKeys.length);
       
          if (translated === 40) {
            setTranslate(0);
          } else {
            setTranslate(translated + 10);
          }
          getStats(setCount);

          // updateWithRandomNumber(setCount);
          setPulled(!pulled);
        }
      }

      if (mx > 50) {
        let colCode = colorArray[songIndex].replace(/["']/g, "");

        set({
          color: colorArray[songIndex],
          background: `radial-gradient(${colCode}, transparent)`,
        });
        setSongIndex((songIndex + 1) % songData.length);
        props.setMainColor(colorArray[songIndex]);
      }

      /* if (pulled) {
      set({ x:  '500px', y: '500px' })
    
      } else {
     
        set({ x:  '300px', y: '300px' })
    
      } */
    }
  );

  function getStats(setCount) {

    setCount(songData[songIndex][songKeys[selIndex]]);
  }

  function updateWithRandomNumber(setCount) {
    const integerLength = initialNumber.toString().split(".")[0].length;
    const min = 0;
    const max = 20;

    let num = Math.random() * max;
    setCount(num.toFixed(3));
  }

  function pickItem() {
    console.log("waa");
  }

  // Bind it to a component
  return (
    <div className="middle-block">
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px",
          marginBottom: '50px'
        }}
      >
     {/*    <div
          className="middle-image"
          style={{
            background: songData
              ? `url(${songData[songIndex].image})`
              : "transparent",
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            width: "100px",
            height: "100px",
            filter: "opacity(50%) grayscale(100%)",
            transform: 'translateY(-50px)'
        
          }}
        ></div> */}
      </div>
      <div className="left-middle-block">
        <div className="tracking-info">
          <div style={{ alignItems: "flex-end" }} className="tracking-title">
            {songData ? songData[songIndex].title : "No song"}
          </div>
          <div style={{ fontSize: "12px" }} className="tracking-option">
            {songData ? songData[songIndex].music_label : "No label"}
          </div>
        </div>
        <animated.div
          {...bind()}
          style={{
            transform: move,
          }}
          className="middle-list"
        >
          {songKeys.map((item, index) => (
            <animated.div
              {...bind()}
              style={{
                opacity: index === selIndex ? "90%" : "45%",
                color: color,
              }}
              className="list-item"
              onClick={pickItem}
            >
              {item}
            </animated.div>
          ))}
        </animated.div>

        <div className="bottom-list">
          <div>
            Released:{" "}
            <span> {songData ? songData[songIndex].released : "Null"}</span>
          </div>
        </div>
      </div>
      <div className="radio-container">
        <animated.div
          className="script-box"
          {...bind()}
          style={{
            width: y,
            background: background,
            height: x,
            borderRadius: "50%",
            filter: "blur(30px) contrast(150%) brightness(1.5)",
            touchAction: "none",
          }}
        />
        <animated.span
          {...bind()}
          style={{
            display: "inline-block",
            width: y1,
            filter: "contrast(150%) brightness(1.5) opacity(0.2)",
            height: x1,
            borderRadius: "50%",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: color,
            backgroundColor: "rgba(0, 0, 0, 0)",
            position: "absolute",
            opacity: op,
            pointerEvents: "none",

            touchAction: "none",
          }}
        ></animated.span>
        <animated.span
          {...bind()}
          style={{
            display: "inline-block",
            width: y2,
            filter: "contrast(150%) brightness(1.5) opacity(0.2)",
            height: x2,
            borderRadius: "50%",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: color,
            backgroundColor: "rgba(0, 0, 0, 0)",
            position: "absolute",
            opacity: op,
            pointerEvents: "none",

            touchAction: "none",
          }}
        ></animated.span>
        <animated.span
          {...bind()}
          style={{
            display: "inline-block",
            width: y3,
            filter: "contrast(150%) brightness(1.5) opacity(0.2)",
            height: x3,
            borderRadius: "50%",
            opacity: op,
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: color,
            backgroundColor: "rgba(0, 0, 0, 0)",
            position: "absolute",

            pointerEvents: "none",

            touchAction: "none",
          }}
        ></animated.span>
        <div className="radio-text">
          <Number setCount={setCount} number={number} />
          <div className="radio-station">{songKeys[selIndex]}</div>
        </div>
      </div>
    </div>
  );
}
