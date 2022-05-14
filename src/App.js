import React from "react";
import "./App.css";
import Form from "./components/Form/Form";
import Table from "./components/Table/Table";

export const AppContext = React.createContext(null);

function App() {
  const [data, setData] = React.useState([]);

  //my-json-server.typicode.com/mik-dorje/Data/tables

  https: React.useEffect(() => {
    const url =
      "https://my-json-server.typicode.com/mik-dorje/avocado-react-task/tables";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json)
        setData(json);
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchData();
  }, []);

  // console.log(data);

  return (
    <AppContext.Provider value={{ data, setData }}>
      <div className="App">
        <Form />
        <Table />
      </div>
    </AppContext.Provider>
  );
}

export default App;
