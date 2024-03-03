/** @format */

import "./App.css";
import TodoContainer from "./components/TodoContainer";
import Container from "@mui/material/Container";

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <h1 className="todo-title">TODO LIST</h1>
        <TodoContainer />
      </Container>
    </div>
  );
}

export default App;
