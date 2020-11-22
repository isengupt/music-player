import React, { useState } from "react";

import numeral from "numeral";
import { Spring } from "react-spring/renderprops";
import classname from "classname";
import useInterval from "./useInterval";

import "./style.css";

const initialNumber = 1586.12;
const updateInterval = 2000; //ms

function updateWithRandomNumber(setCount) {
  const integerLength = initialNumber.toString().split(".")[0].length;
  const min = 0;
  const max = 20;



  let num = Math.random() * max;
  setCount(num.toFixed(3));
}

function Number(props) {
 // const [number, setCount] = useState(initialNumber);

   function updateVal() {
    
       updateWithRandomNumber(props.setCount)
   }

  const chars = numeral(props.number).format("0.00").split("");

  return (
    <div className="page">
      <div className="odometer">
        {chars.map((digit, i) => {
          if (isNaN(digit)) {
            return (
              <div
                key={`digit-${i}`}
                className={classname("digit", {
                  narrow: [".", ","].includes(digit)
                })}
              >
                {digit}
              </div>
            );
          }

          return (
            <Spring
              key={`digit-${i}`}
              from={{ translateY: 0, opacity: 0,  pointerEvents: "none",
  
  touchAction: "none", }}
              to={{ translateY: -digit, opacity: 1, pointerEvents: "none",
  
  touchAction: "none", }}

            >
              {(props) => (
                <div className="digit">
                  <div
                    style={{
                      opacity: props.opacity,
                      transform: `translateY(${props.translateY}em)`
                    }}
                  >
                    0 1 2 3 4 5 6 7 8 9 0
                  </div>
                </div>
              )}
            </Spring>
          );
        })}
      </div>
    </div>
  );
}

export default Number
