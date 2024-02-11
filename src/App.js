/** @format */

import "./App.css";
import Todo from "./Todo";
import Container from "@mui/material/Container";

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <h1 className="todo-title">TO DO LIST</h1>
        <Todo />
      </Container>
    </div>
  );
}

export default App;
