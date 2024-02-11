/** @format */
import React, { useState } from "react";
import { FormControl } from "@mui/base/FormControl";
import TodoList from "./TodoList";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/material/Button";
import { OutlinedInput, Alert } from "@mui/material";
import Grid from "@mui/material/Grid";

const Todo = () => {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editText, setEditText] = useState(false);

  const editTask = (e) => {
    const taskText = e.currentTarget.parentElement.parentElement.firstChild;
    if (taskText.parentElement.classList.contains("completed")) return;

    if (editText) {
      setEditText(false);
      taskText.setAttribute("contentEditable", false);

    } else {
      setEditText(true);
      taskText.setAttribute("contentEditable", true);
      taskText.focus();
    }
  };

  const completeTask = (e) => {
    const listItem = Number(e.currentTarget.parentElement.parentElement.id);

    setTasks(
      tasks.map((task) => {
        if (task.id === listItem) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  };
  const addTask = () => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      editText: false,
    };

    setTasks([...tasks, newTask]);
    setText("");
  };

  const deleteTask = (e) => {
    const listItem = Number(e.currentTarget.parentElement.parentElement.id);
    setTasks(tasks.filter((item) => item.id !== listItem));
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <FormControl defaultValue="" centered component>
        <FormLabel>Your Task:</FormLabel>
        <OutlinedInput
          placeholder="Placeholder"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button
          sx={{ m: 0.2 }}
          variant="contained"
          color="primary"
          disabled={!text}
          onClick={addTask}
        >
          ADD
        </Button>

        {tasks.length > 0 ? (
          <TodoList
            tasks={tasks}
            deleteTask={deleteTask}
            editTask={editTask}
            completeTask={completeTask}
            editText={editText}
          />
        ) : (
          <Alert severity="error" sx={{ m: 5 }}>
            No tasks
          </Alert>
        )}
      </FormControl>
    </Grid>
  );
};

export default Todo;
