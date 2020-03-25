import React, { useState, useEffect } from "react";
import { Chord } from "@potion/layout";
import { Svg, Ribbon, Circle } from "@potion/element";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const ChordComp = () => {
  //`
  const [shapes, setShapes] = useState([]);

  const [chordData, setChordData] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/colors`)
      .then(res => {
        setShapes(res.data);
      })
      .catch(err =>
        console.log("ERROR: data not returned fom API call: ", err)
      );
  }, []);

  useEffect(() => {
    const generateChordData = shapes.map((_, i) => ({
      value: Math.floor(Math.random() * (shapes.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setChordData(generateChordData);
  }, [shapes]);

  // implementing the chord visualization from the potion library
  return (
    <div className="chord-wrapper">
      <Svg width={400} height={400}>
        <Chord
          data={{
            children: chordData
          }}
          animate
          nodeEnter={d => ({
            ...d,
            sourceStartAngle: d.sourceEndAngle,
            targetStartAngle: d.targetEndAngle
          })}
        >
          {nodes =>
            nodes.map((node, i) => (
              <Ribbon
                {...node}
                source={{
                  startAngle: 0.7524114,
                  endAngle: 1 / 1212972,
                  radius: 200
                }}
                target={{
                  startAngle: 1.8617078,
                  endAngle: 1.9842927,
                  radius: 200
                }}
                fill="black"
                stroke="black"
                fillOpacity={0.9}
                height={250}
                width={100}
                transform={{ translate: [200, 200] }}
              />
            ))
          }
        </Chord>
        <Circle component="circle" cx={100} cy={100} r={30} fill="black" />
      </Svg>
    </div>
  );
};

export default ChordComp;
