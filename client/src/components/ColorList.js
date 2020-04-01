import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
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

  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const history = useHistory();

  const addSwitch = () => {
    if (!adding) {
      setAdding(adding);
      setEditing(!editing);
    }
  };

  const editSwitch = () => {
    if (!editing) {
      setEditing(editing);
      setAdding(!adding);
    }
  };

  // function that handles the inputs of the add color form
  const addHandler = e => {
    setColorToAdd({
      ...colorToAdd,
      [e.target.name]: e.target.value
    });
  };

  // function that makes a post request to add a new color
  function handleAdd(e, colorToAdd) {
    e.preventDefault();
    axiosWithAuth()
      .post(`/api/colors`, colorToAdd)
      .then(res => {
        const newColors = colors.map(color => {
          if (color) {
            return res.data;
          }
          return newColors;
        });
        updateColors(newColors);
      })
      .then(history.push("/protected"))
      .catch(err => console.log("ERROR: ", err));
  }

  // function that enables editing via the edit form
  const editColor = e => {
    setColorToEdit({
      ...colorToEdit,
      [e.target.name]: e.target.value
    });
  };

  // function that sends data to the updateHandler function
  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    updateHandler(colorToEdit);
  };

  // function to  make a put request to the server to edit a color by color.id
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
            <div className="add" onClick={() => editSwitch()}>
              +
            </div>
            <p>Add New Color</p>
          </span>
        </li>
        {colors.map(color => (
          <li key={color.color} onClick={() => addSwitch()}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.preventDefault();
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
            <input onChange={e => editColor(e)} value={colorToEdit.color} />
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
            <button type="submit" onClick={e => saveEdit(e)}>
              save
            </button>
            <button type="button" onClick={() => setEditing(false)}>
              cancel
            </button>
          </div>
        </form>
      )}
      {adding && (
        <form className="add-wrapper" onSubmit={e => handleAdd(e)}>
          <legend>add color</legend>
          <label>
            <p>color name:</p>
            <input
              onChange={e => addHandler(e)}
              value={colorToAdd.color}
              name="color"
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e => addHandler(e)}
              value={colorToAdd.code.hex}
              name="code"
            />
          </label>
          <div className="button-row">
            <button type="submit">Add Color</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ColorList;
