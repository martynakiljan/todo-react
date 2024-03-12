/** @format */
import React, { useState, useEffect } from "react";
import "./App.css";
import TodoContainer from "./components/TodoContainer";
import Container from "@mui/material/Container";
import CompletedTaskContainer from "./components/CompletedTasksContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrush } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";
import { ThemeContext } from "./context/context.js";

function App() {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("theme-light");
      document.body.classList.remove("theme-dark");
    } else {
      document.body.classList.add("theme-dark");
      document.body.classList.remove("theme-light");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <div className="App">
        <Container maxWidth="md">
          <h1 className="todo-title">TODO LIST</h1>
          <Tooltip title="you can change theme!">
            <FontAwesomeIcon
              icon={faBrush}
              onClick={(e) => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
            />
          </Tooltip>
          <TodoContainer tasks={tasks} setTasks={setTasks} />
        </Container>
        <Container maxWidth="sm">
          <h2 className="todo-title todo-title__completed">COMPLETED TASKS</h2>
          <CompletedTaskContainer tasks={tasks} />
        </Container>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
