import React from 'react'

export const useLocalStorage = ({ object, setObject }) => {
  {
    object &&
      function callback (setObject) {
        saveData.obj = obj
        saveData.time = new Date().getTime()
        localStorage.saveData = JSON.stringify(saveData)
      }
  }
  let saveData = JSON.parse(localStorage.saveData)
}
