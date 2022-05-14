import React from "react";
import "./Form.css";
import { AppContext } from "../../App";

// import { nanoid } from 'nanoid'

function Form() {
  const { data, setData } = React.useContext(AppContext);
  const [loading, setLoading] = React.useState(false);

  const emptyData = {
    id: "",
    layout: "",
    name: "",
    capacity: "",
    status: "",
    image: "",
  };

  const [formData, setFormData] = React.useState(emptyData);

  const handleChange = (event) => {
    // event.preventDefault();
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: value,
      };
    });
  };

  //console.log(formData);

  const handleCreate = async (event) => {
    event.preventDefault();

    setLoading(true);
    // console.log(formData);
    const newData = {
      id: data.length + 1,
      layout: formData.layout,
      name: formData.name,
      capacity: formData.capacity,
      status: formData.status,
      image: formData.image,
    };
    //fetching random human avatar as the data changed is not persisted
    newData.image = `https://avatars.dicebear.com/api/micah/${newData.id}.svg`;

    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/mik-dorje/avocado-react-task/tables/`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newData),
        }
      );
      const resJson = await response.json();
      const newDatas = [...data, resJson];
      setData(newDatas);
    } catch (error) {
      console.error(error);
    }
    const newDatas = [...data, newData];
    setData(newDatas);
    setFormData(emptyData);
    setLoading(false);
  };

  return (
    <div className="Form-box">
      <h3>Create Table</h3>
      <form className="Form" onSubmit={handleCreate}>
        <div className="row">
          <label>Layout:</label>
          <select
            required
            onChange={handleChange}
            name="layout"
            value={formData.layout}
          >
            <option defaultValue>Select Layout</option>
            <option value="Layout1">Layout 1</option>
            <option value="Layout2">Layout 2</option>
            <option value="Layout3">Layout 3</option>
          </select>
        </div>

        <div className="row">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter name"
            required
            onChange={handleChange}
            name="name"
            value={formData.name}
          ></input>
        </div>

        <div className="row">
          <label>Capacity:</label>
          <input
            type="number"
            placeholder="Enter number of capacity"
            required
            onChange={handleChange}
            name="capacity"
            value={formData.capacity}
          ></input>
        </div>

        <div className="row">
          <label>Status:</label>
          <input
            type="checkbox"
            onChange={handleChange}
            name="status"
            checked={formData.status}
          ></input>
        </div>

        <div className="row">
          <label>Image:</label>
          <input
            type="file"
            onChange={handleChange}
            name="image"
            value={formData.image}
          ></input>
        </div>
      </form>

      <div className="buttons-container">
        <button
          type="submit"
          onClick={handleCreate}
          className="btns create-btn"
          disabled={loading}
        >
          {loading ? "Creating Table..." : "Create Table"}
        </button>

        <button
          type="submit"
          className="btns  cancel-btn"
          onClick={() => setFormData(emptyData)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Form;
