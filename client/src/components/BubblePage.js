import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import Spinner from "./Spinner";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/colors`)
      .then(setIsLoading(true))
      .then(res => {
        console.log(res.data);
        setColorList(res.data);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="bubble-page">
      {!isLoading ? (
        <div className="color-list-wrapper">
          <ColorList colors={colorList} updateColors={setColorList} />
          <Bubbles colors={colorList} />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default BubblePage;
