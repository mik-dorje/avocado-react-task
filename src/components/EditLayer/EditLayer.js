import React from "react";
import "./EditLayer.css";

import { EditContext } from "../Table/Table";

import { AppContext } from "../../App";
const EditLayer = ({ row }) => {
  const { data, setData } = React.useContext(AppContext);
  const [loading, setLoading] = React.useState(false);

  const { editLayerId, setEditLayerId } = React.useContext(EditContext);

  const [updateData, setUpdateData] = React.useState(row);

  const handleUpdate = (event) => {
    // event.preventDefault();
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setUpdateData(function (prev) {
      return {
        ...prev,
        [event.target.name]: value,
        // [name] : value
      };
    });
  };

  const handleUpdateClick = async (event) => {
    event.preventDefault();
    setLoading(true);

    const index = data.findIndex((row) => row.id === parseInt(event.target.id));
    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/mik-dorje/avocado-react-task/tables/${event.target.id}`,
        {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        }
      );
      if (!response.ok) throw new Error(response.statusText);

      const resJson = await response.json();
      const tempData = [...data];
      tempData[index] = { ...data[index], ...resJson };
      setData(tempData);
    } catch (error) {
      // Updating data not present in the mock api as the new data posted is not persisted
      if (updateData.id > 3) {
        const tempData = [...data];
        tempData[index] = { ...data[index], ...updateData };
        setData(tempData);
      }
    }
    setEditLayerId(null);
    setLoading(false);
  };

  const handleCancelClick = () => {
    setEditLayerId(null);
  };

  return (
    <tr key={row.id}>
      <td>
        <select
          required="required"
          onChange={handleUpdate}
          name="layout"
          defaultValue={updateData.layout}
        >
          <option>Select Layout</option>
          <option value={"Layout1"}>Layout 1</option>
          <option value={"Layout2"}>Layout 2</option>
          <option value={"Layout3"}>Layout 3</option>
        </select>
      </td>

      <td>
        <input
          type="text"
          placeholder={row.name}
          value={updateData.name}
          onChange={handleUpdate}
          name="name"
        ></input>
      </td>

      <td>
        <input
          type="number"
          placeholder={row.capacity}
          value={updateData.capacity}
          onChange={handleUpdate}
          name="capacity"
        ></input>
      </td>

      {/* <td>{row.status ? "True" : "False"}</td> */}
      <td>
        <input
          type="checkbox"
          checked={updateData.status}
          onChange={handleUpdate}
          name="status"
        ></input>
      </td>

      {/* <td ><img src={row.image} alt="image" /></td> */}
      <td>
        <input
          type="file"
          placeholder=""
          onChange={handleUpdate}
          name="image"
        ></input>
      </td>
      <td className="buttons">
        <button
          id={row.id}
          onClick={handleUpdateClick}
          className="table-btns update-btn"
          disabled={loading}
        >
          {loading ? "Updating" : "Update"}
        </button>
        <button
          id={row.id}
          onClick={handleCancelClick}
          className="table-btns canc-btn"
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditLayer;
