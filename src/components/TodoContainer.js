/** @format */
import React, { useEffect, useState, useRef } from "react";
import { FormControl } from "@mui/base/FormControl";
import TodoList from "./TodoList";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/material/Button";
import { OutlinedInput, Alert, Typography, Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import Info from "./Info";
import ConfirmationModal from "./ConfirmationModal";

const TodoContainer = React.memo(({ tasks, setTasks }) => {
  const [text, setText] = useState("");
  const [disable, setDisable] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [idDeletedTask, setIdDeletedTask] = useState(0);
  const [lastAddedTaskId, setLastAddedTaskId] = useState(null);

  const editTask = React.useCallback(
    (completed, text, id) => {
      if (completed) return;
      setText(text);
      setIsEdited(true);
      setTasks((current) => current.filter((task) => task.id !== id));
    },
    [setText, setIsEdited, setTasks]
  );

  const markAsImportant = React.useCallback(
    (id) => {
      const importantTask = tasks.map((task) => {
        if (task.id === id) {
          task.important = !task.important;
        }
        return task;
      });
      setTasks(importantTask);
    },
    [tasks, setTasks]
  );

  const completeTask = React.useCallback(
    (id) => {
      setTasks((tasks) =>
        tasks.map((task) => {
          if (task.id === id) {
            task.completed = !task.completed;
          }
          return task;
        })
      );
    },
    [setTasks]
  );

  const addTask = React.useCallback(() => {
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
      setLastAddedTaskId(newTask.id);
    }
  }, [tasks, setTasks, text]);

  const closeModalandDelete = () => {
    deleteTask();
  };

  const closeModalandDoNothing = React.useCallback(() => {
    setConfirmation(false);
  }, [setConfirmation]);

  const showDeleteModal = React.useCallback(
    (id) => {
      setConfirmation(true);
      setIdDeletedTask(id);
    },
    [setConfirmation, setIdDeletedTask]
  );

  const deleteTask = React.useCallback(() => {
    setConfirmation(false);
    setTasks((tasks) => tasks.filter((item) => item.id !== idDeletedTask));
  }, [setConfirmation, setTasks, idDeletedTask]);

  useEffect(() => {
    if (text.trim().length < 1) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [text]);

  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragstart = React.useCallback(
    (id) => {
      dragItem.current = id;
    },
    [dragItem]
  );

  const dragenter = React.useCallback(
    (e) => {
      dragOverItem.current = e.currentTarget.id;
    },
    [dragOverItem]
  );

  const drop = React.useCallback(() => {
    const dragItemIndex = tasks.findIndex(
      (task) => task.id === dragItem.current
    );

    if (dragItemIndex !== -1) {
      const copyListItems = [...tasks];
      const dragItemContent = copyListItems[dragItemIndex];
      copyListItems.splice(dragItemIndex, 1);
      copyListItems.splice(dragOverItem.current, 0, dragItemContent);
      setTasks(copyListItems);
    }

    dragItem.current = null;
    dragOverItem.current = null;
  }, [dragItem, setTasks, tasks]);

  return (
    <Card sx={{ pt: 5, pb: 5, pr: 3, pl: 3 }}>
      {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <FormControl defaultValue="">
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

          {tasks.length > 0 ? (
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
                lastAddedTaskId={lastAddedTaskId}
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
});

export default TodoContainer;
