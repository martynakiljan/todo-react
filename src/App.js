/** @format */
import React, { useState, useEffect } from "react";
import "./App.css";
import TodoContainer from "./components/TodoContainer";
import Container from "@mui/material/Container";
import CompletedTaskContainer from "./components/CompletedTasksContainer";
import Tooltip from "@mui/material/Tooltip";
import { ThemeContext } from "./context/context.js";
import { createTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { DarkMode } from "@mui/icons-material";

function App() {
  const [tasks, setTasks] = useState([]);
  const [mode, setMode] = useState("light");

  const theme = createTheme({
    palette: {
      light: {
        main: "#1976d2",
      },
      dark: {
        main: "#020028",
      },
    },
  });

  const changeMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (mode === "light") {
      document.body.classList.add("theme-light");
      document.body.classList.remove("theme-dark");
    } else {
      document.body.classList.add("theme-dark");
      document.body.classList.remove("theme-light");
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ theme, mode }}>
      <div className="App">
        <Container maxWidth="md">
          <h1 className="todo-title">TODO LIST</h1>
          <Tooltip title="you can change theme!">
            <IconButton onClick={changeMode} color="inherit">
              {
                <Typography
                  color={mode === "light" ? "black" : "rgb(92, 139, 194)"}
                  sx={{ pr: 1 }}
                >
                  {mode === "light" ? "dark" : "light"} mode
                </Typography>
              }
              {mode === "dark" ? (
                <Brightness7Icon style={{ color: "rgb(92, 139, 194)" }} />
              ) : (
                <DarkMode />
              )}
            </IconButton>
          </Tooltip>
          <TodoContainer tasks={tasks} setTasks={setTasks} />
        </Container>
        <Container maxWidth="sm">
          <h2 className="todo-title todo-title__completed">
            COMPLETED TASKS :)
          </h2>
          <CompletedTaskContainer tasks={tasks} />
        </Container>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
