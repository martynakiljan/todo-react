/** @format */
import React, { useEffect, useState, useRef } from "react";
import { FormControl } from "@mui/base/FormControl";
import TodoList from "./TodoList";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/material/Button";
import { OutlinedInput, Alert, Typography, Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import Info from "./Info";
import ClipLoader from "react-spinners/ClipLoader";
import ConfirmationModal from "./ConfirmationModal";

const TodoContainer = ({ tasks, setTasks }) => {
  const [text, setText] = useState("");
  const [disable, setDisable] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [idDeletedTask, setIdDeletedTask] = useState(0);

  const spinner = {
    display: "block",
    margin: "20px auto",
  };

  const editTask = (completed, text, id) => {
    if (completed) return;
    setText(text);
    setIsEdited(true);
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const markAsImportant = (id) => {
    const importantTask = tasks.map((task) => {
      if (task.id === id) {
        task.important = !task.important;
      }
      return task;
    });

    setTasks(importantTask);
  };

  const completeTask = (id) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === id) {
          task.completed = !task.completed;
        }
        return task;
      })
    );
  };

  const addTask = () => {
    if (text.length > 1) {
      const newTask = {
        id: Date.now(),
        text,
        completed: false,
        important: false,
      };

      setLoading(true);
      setTimeout(() => {
        setTasks([...tasks, newTask]);
        setLoading(false);
      }, 200);

      setText("");
      setIsEdited(false);
    }
  };

  const closeModalandDelete = () => {
    deleteTask();
  };

  const closeModalandDoNothing = () => {
    setConfirmation(false);
  };

  const showDeleteModal = (id) => {
    setConfirmation(true);
    setIdDeletedTask(id);
  };

  const deleteTask = () => {
    setConfirmation(false);
    setTasks((tasks) => tasks.filter((item) => item.id !== idDeletedTask));
  };

  useEffect(() => {
    if (text.trim().length < 1) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [text]);

  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragstart = (e, id) => {
    console.log("drag start");
    dragItem.current = id;
  };
  const dragenter = (e) => {
    console.log("drag enter");
    dragOverItem.current = e.currentTarget.id;
  };

const drop = () => {
  console.log("drop");
  const copyListItems = [...tasks];
  const dragItemIndex = tasks.findIndex((task) => task.id === dragItem.current);
  const dragItemContent = copyListItems[dragItemIndex];

  // Sprawdź, czy udało się znaleźć index elementu
  if (dragItemIndex !== -1) {
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    setTasks(copyListItems);
  }

  dragItem.current = null;
  dragOverItem.current = null;
};

  return (
    <Card sx={{ pt: 5, pb: 5, pr: 3, pl: 3 }}>
      {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
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
              minWidth: "60%",
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

          {loading ? (
            <ClipLoader
              color="#1976d2"
              loading={loading}
              size={20}
              aria-label="Loading Spinner"
              cssOverride={spinner}
              data-testid="loader"
            />
          ) : tasks.length > 0 ? (
            <>
              <TodoList
                tasks={tasks}
                deleteTask={deleteTask}
                completeTask={completeTask}
                editTask={editTask}
                showDeleteModal={showDeleteModal}
                markAsImportant={markAsImportant}
                dragenter={dragenter}
                dragstart={dragstart}
                drop={drop}
              />
              <Info tasks={tasks} />
              {confirmation ? (
                <ConfirmationModal
                  closeModalandDoNothing={closeModalandDoNothing}
                  closeModalandDelete={closeModalandDelete}
                />
              ) : null}
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

export default TodoContainer;
