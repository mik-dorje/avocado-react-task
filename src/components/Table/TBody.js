import React from "react";
import { AppContext } from "../../App";
import { EditContext } from "./Table";

const TBody = ({ row }) => {
  const { data, setData } = React.useContext(AppContext);
  const { editLayerId, setEditLayerId } = React.useContext(EditContext);

  const [loading, setLoading] = React.useState(false);

  const handleEdit = (event) => {
    event.preventDefault();
    setEditLayerId(parseInt(event.target.id));
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    setLoading(true);
    const index = data.findIndex((row) => row.id === parseInt(event.target.id));
    try {
      await fetch(
        `https://my-json-server.typicode.com/mik-dorje/avocado-react-task/tables/${event.target.id}`,
        {
          method: "delete",
          headers: { "Content-Type": "application/json" },
        }
      );
      const tempData = [...data];
      tempData.splice(index, 1);
      setData(tempData);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <tr key={row.id}>
      <td>{row.layout}</td>
      <td>{row.name}</td>
      <td>{row.capacity}</td>
      <td>{row.status ? "True" : "False"}</td>
      <td>
        <img src={row.image} alt="image" />
      </td>

      <td className="buttons">
        <button
          id={row.id}
          onClick={handleEdit}
          className="table-btns edit-btn"
        >
          Edit
        </button>
        <button
          id={row.id}
          onClick={handleDelete}
          className="table-btns delete-btn"
          disabled={loading}
        >
          {loading ? "Deleting" : "Delete"}
        </button>
      </td>
    </tr>
  );
};

export default TBody;
