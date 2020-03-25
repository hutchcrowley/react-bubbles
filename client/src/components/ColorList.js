import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const addColor = {
  id: Math.random(Date.now()),
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // Initializing the colorToEdit var to state. This will hold the currently selected color to be updated using the .PUT method
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  console.log("colorToEdit variable in ColorList component: ", colorToEdit);

  // setting the editing status of the color to edit to staate
  const [editing, setEditing] = useState(false);

  // setting the editing status of the color to edit to staate
  const [adding, setAdding] = useState(false);

  const [newColor, setColorToAdd] = useState(addColor);
  console.log("newColor variable in the BubblePage component: ", newColor);

  const history = useHistory();

  const editColor = color => {
    setEditing(true);
    setAdding(false);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.stopPropagation();
    setEditing(false);
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    updateHandler(colorToEdit);
  };

  const submitAdd = newColor => {
    colors.filter(color => color.id !== colors.id);
    setAdding(false);
    addHandler(newColor);
  };

  function updateHandler(colorToEdit) {
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(response => {
        const updatedColors = colors.map(color => {
          if (color.id === colorToEdit.id) {
            return response.data;
          }
          return color;
        });
        updateColors(updatedColors);
      })
      .then(history.push("/protected"))
      .catch(err => console.log(err));
  }

  function addHandler(newColor) {
    axiosWithAuth()
      .post(`/api/colors`, newColor)
      .then(res => {
        const newColors = colors.map(color => {
          if (color.id === newColor.id) {
            return res.data;
          }
          return color;
        });
        updateColors(newColors);
      })
      .then(history.push("/protected"))
      .catch(err => console.log("ERROR: ", err));
  }

  // make a delete request to delete this color
  function deleteColor(color) {
    console.log("FROM ColorList: ", color);
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log(res.data);
        const newColors = colors.filter(c => c.id !== color.id);
        updateColors(newColors);
        history.push(`/protected`);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="colors-wrap">
      <h2>colors</h2>
      <ul>
        <li>
          <span className="add-wrap">
            <span
              className="add"
              onClick={() => {
                setAdding(true);
              }}
            >
              +
            </span>
            <p>Add New Color</p>
          </span>
        </li>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form className="edit-wrap" onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button type="button" onClick={() => setEditing(false)}>
              cancel
            </button>
          </div>
        </form>
      )}
      {adding && (
        <form className="add-wrapper" onSubmit={submitAdd}>
          <legend>add color</legend>
          <label>
            <p>color name:</p>
            <input
              onChange={e =>
                setColorToAdd({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...newColor,
                  code: { hex: e.target.value }
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Add</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ColorList;
