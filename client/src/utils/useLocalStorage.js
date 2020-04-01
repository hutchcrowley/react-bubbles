import React from "react";

export const useLocalStorage = object => {
  {
    object &&
      function callback(object) {
        saveData.obj = obj;
        saveData.time = new Date().getTime();
        localStorage.saveData = JSON.stringify(saveData);
      };
  }
  let saveData = JSON.parse(localStorage.saveData);
};
