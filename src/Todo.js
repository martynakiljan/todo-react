/** @format */
import React, { useEffect, useState, useRef } from "react";
import { FormControl } from "@mui/base/FormControl";
import TodoList from "./TodoList";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/material/Button";
import { OutlinedInput, Alert, Typography, Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import Info from "./Info";

const Todo = () => {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [disable, setDisable] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isImportant, setIsImportant] = useState(false);

  const editTask = (e) => {
    const checkIfCompleted = e.currentTarget.parentElement.parentElement;

    if (!checkIfCompleted.classList.contains("completed")) {
      //przenosze tekst z kliknietego taska do inputa//
      const textToEdit =
        e.currentTarget.parentElement.previousSibling.innerText;
      setText(textToEdit);
      setIsEdited(true);
      //usuwam ten task z listy//
      const taskID = e.currentTarget.parentElement.parentElement.id;
      setTasks((current) => current.filter((task) => task.id != taskID));
    }
  };

  const markAsImportant = (e) => {
    const taskID = e.currentTarget.parentElement.parentElement.id;
    const importantTask = tasks.map((task) => {
      if (task.id == taskID) {
        task.important = !task.important;
      }
      return task;
    });
    console.log(importantTask);
    setIsImportant(true);
    setTasks(importantTask);
  };

  const completeTask = (e) => {
    const taskID = e.currentTarget.parentElement.parentElement.id;
    const completeTask = tasks.map((task) => {
      if (task.id == taskID) {
        task.completed = !task.completed;
      }
      return task;
    });

    setTasks(completeTask);

    // setTasks(
    //   tasks.map((task) => {
    //     console.log(task);
    //     if (task.id === listItem) {
    //       return { ...task, completed: true };
    //     } else {
    //       return task;
    //     }
    //   })
    // );
  };

  const addTask = () => {
    if (text.length > 1) {
      const newTask = {
        id: Date.now(),
        text,
        completed: false,
        important: false,
      };

      setTasks([...tasks, newTask]);
      setText("");
      setIsEdited(false);
      setIsImportant(false);
    }
  };

  const deleteTask = (e) => {
    const listItem = Number(e.currentTarget.parentElement.parentElement.id);
    setTasks(tasks.filter((item) => item.id !== listItem));
  };

  useEffect(() => {
    if (text.trim().length === 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [text]);

  return (
    <Card sx={{ pt: 5, pb: 5, pr: 3, pl: 3 }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <FormControl defaultValue="" centered component>
          <FormLabel
            className="label"
            sx={{ color: "primary.main" }}
            variant="h3"
          >
            <Typography
              variant="h7"
              sx={{ color: "primary.main", paddingBottom: 1 }}
            >
              {" "}
              Your task:
            </Typography>
          </FormLabel>
          <OutlinedInput
            placeholder="what should you do?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{
              minWidth: "250px",
              padding: "0px",
              marginRight: 2.5,
              marginBottom: 1,
            }}
          />

          <Button
            variant="contained"
            color="primary"
            disabled={disable}
            onClick={addTask}
          >
            {isEdited ? "Edit Task" : "Add Task"}
          </Button>

          {tasks.length > 0 ? (
            <>
              <TodoList
                tasks={tasks}
                deleteTask={deleteTask}
                completeTask={completeTask}
                editTask={editTask}
                markAsImportant={markAsImportant}
                isImportant={isImportant}
              />
              <Info tasks={tasks} />
            </>
          ) : (
            <Alert severity="error" sx={{ m: 5 }}>
              No tasks
            </Alert>
          )}
        </FormControl>
      </Grid>
    </Card>
  );
};

export default Todo;
