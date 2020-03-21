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

  // Here, I'm setting the editing status of the color to edit to staate
  const [editing, setEditing] = useState(false);
  console.log(colorToEdit);

  const history = useHistory();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    setEditing(false);
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    updateHandler(colorToEdit);
  };

  const updateHandler = colorToEdit => {
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(response => {
        const newColors = colors.map(color => {
          if (color.id === colorToEdit.id) {
            return response.data;
          }
          return color;
        });
        updateColors(newColors);
      })
      .then(history.push("/protected"))
      .catch(err => console.log(err));
  };

  // make a delete request to delete this color
  const deleteColor = color => {
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
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
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
        <form onSubmit={saveEdit}>
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
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
