/** @format */
import React, { useEffect, useState } from "react";
import "./App.css";
import TodoContainer from "./components/TodoContainer";
import Container from "@mui/material/Container";
import CompletedTaskContainer from "./components/CompletedTasksContainer";

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <div className="App">
      <Container maxWidth="sm">
        <h1 className="todo-title">TODO LIST</h1>
        <TodoContainer tasks={tasks} setTasks={setTasks} />
      </Container>

      <Container maxWidth="sm">
        <h2 className="todo-title todo-title__completed">COMPLETED TASKS</h2>
        <CompletedTaskContainer tasks={tasks} />
      </Container>
    </div>
  );
}

export default App;
