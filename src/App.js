/** @format */
import React, { useState, useEffect } from "react";
import "./App.css";
import TodoContainer from "./components/TodoContainer";
import Container from "@mui/material/Container";
import CompletedTaskContainer from "./components/CompletedTasksContainer";
import Tooltip from "@mui/material/Tooltip";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { DarkMode } from "@mui/icons-material";

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const changeTheme = () => {
    setDarkMode(!darkMode);
  };

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2",
      },
      text: {
        primary: "#1976d2",
      },
      secondary: {
        main: "#1976d2",
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#c5dbf1",
      },
      text: {
        primary: "#c5dbf1",
      },
      secondary: {
        main: "#c5dbf1",
      },
      background: "#6b6b6b",
    },
  });

  useEffect(() => {
    if (!darkMode) {
      document.body.classList.add("theme-light");
      document.body.classList.remove("theme-dark");
    } else {
      document.body.classList.add("theme-dark");
      document.body.classList.remove("theme-light");
    }
  }, [darkMode]);

  return (
    <div className="App">
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Container maxWidth="md">
          <h1 className="todo-title">TODO LIST</h1>
          <Tooltip title="you can change theme!">
            <Button
              onClick={changeTheme}
              color="inherit"
              style={{ textTransform: "none" }}
              endIcon={
                darkMode ? (
                  <Brightness7Icon color="primary" />
                ) : (
                  <DarkMode color="primary" />
                )
              }
            >
              <Typography color="secondary">
                {darkMode ? "light" : "dark"} mode
              </Typography>
            </Button>
          </Tooltip>
          <TodoContainer
            tasks={tasks}
            setTasks={setTasks}
            darkMode={darkMode}
          />
        </Container>
        <Container maxWidth="sm">
          <h2 className="todo-title todo-title__completed">
            COMPLETED TASKS 😀
          </h2>
          <CompletedTaskContainer tasks={tasks} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
