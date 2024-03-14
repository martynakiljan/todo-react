/** @format */
import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
} from "react";
import { FormControl } from "@mui/base/FormControl";
import TodoList from "./TodoList";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/material/Button";
import { OutlinedInput, Alert, Typography, Card } from "@mui/material";
import Box from "@mui/material/Box";
import Info from "./Info";
import { ThemeContext } from "../context/context";

const TodoContainer = React.memo(({ tasks, setTasks }) => {
  const [text, setText] = useState("");
  const [disable, setDisable] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const { mode, theme } = useContext(ThemeContext);

  const editTask = React.useCallback(
    (completed, text, id) => {
      if (completed) return;
      setText(text);
      setIsEdited(true);
      setTasks((current) => current.filter((task) => task.id !== id));
    },
    [setText, setIsEdited, setTasks]
  );

  const markAsImportant = useCallback(
    (id) => {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id !== id ? task : { ...task, important: !task.important }
        )
      );
    },
    [setTasks]
  );

  const completeTask = useCallback(
    (id) => {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id !== id ? task : { ...task, completed: !task.completed }
        )
      );
    },
    [setTasks]
  );

  const addTask = React.useCallback(() => {
    if (text.length > 1) {
      const newTask = {
        id: crypto.randomUUID(),
        text,
        completed: false,
        important: false,
      };
      setTasks((tasks) => [...tasks, newTask]);
      setText("");
      setIsEdited(false);
    }
  }, [setTasks, text, setText, setIsEdited]);

  const deleteTask = useCallback(
    (taskId) => {
      setTasks((tasks) => tasks.filter((item) => item.id !== taskId));
    },
    [setTasks]
  );

  useEffect(() => {
    setDisable(text.trim().length < 2);
  }, [text]);

  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragstart = useCallback(
    (id) => {
      dragItem.current = id;
      console.log(dragItem);
    },
    [dragItem]
  );

  const dragenter = useCallback(
    (id) => {
      dragOverItem.current = id;
    },
    [dragOverItem]
  );

  const drop = useCallback(() => {
    const dragItemIndex = tasks.findIndex(
      (task) => task.id === dragItem.current
    );

    if (dragItemIndex !== -1) {
      const dragOverItemIndex = tasks.findIndex(
        (task) => task.id === dragOverItem.current
      );
      setTasks((tasks) => {
        const newTasks = [...tasks];
        const temp = newTasks[dragItemIndex];
        console.log(temp);
        newTasks[dragItemIndex] = newTasks[dragOverItemIndex];
        newTasks[dragOverItemIndex] = temp;
        return newTasks;
      });
    }

    dragItem.current = null;
    dragOverItem.current = null;
  }, [dragItem, setTasks, tasks]);

  const moveUp = (index) => {
    setTasks((prevTasks) => {
      if (index > 0) {
        const newTasks = [...prevTasks];
        [newTasks[index], newTasks[index - 1]] = [
          newTasks[index - 1],
          newTasks[index],
        ];
        return newTasks;
      } else {
        const newTasks = [...prevTasks];
        const firstTask = newTasks.shift();
        newTasks.push(firstTask);
        return newTasks;
      }
    });
  };

  const moveDown = (index) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      if (index < tasks.length - 1) {
        [newTasks[index], newTasks[index + 1]] = [
          newTasks[index + 1],
          newTasks[index],
        ];
        return newTasks;
      } else {
        const lastTask = newTasks.pop();
        newTasks.unshift(lastTask);
        return newTasks;
      }
    });
  };

  return (
    <Card
      sx={{ p: "20px 20px" }}
      style={{ background: mode === "dark" ? "#5c8bc2" : "white" }}
    >
      {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
      <Box
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <FormControl>
          <FormLabel className="label" color="primar" variant="h3">
            <Typography
              variant="h6"
              sx={{ paddingBottom: 1 }}
              color={
                mode === "dark"
                  ? theme.palette.dark.main
                  : theme.palette.light.main
              }
            >
              {" "}
              Your task:
            </Typography>
          </FormLabel>
          <OutlinedInput
            placeholder="what should you do?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addTask();
              }
            }}
            sx={{
              minWidth: "60%",
              padding: "0px",
              marginRight: 2.5,
              marginBottom: 1,
            }}
          />

          <Button
            variant="contained"
            disabled={disable}
            onClick={addTask}
            color="primary"
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
                dragenter={dragenter}
                dragstart={dragstart}
                drop={drop}
                moveUp={moveUp}
                moveDown={moveDown}
              />
              <Info tasks={tasks} />
            </>
          ) : (
            <Alert
              severity="error"
              sx={{ m: 5, width: "50%", margin: "20px auto" }}
            >
              No tasks
            </Alert>
          )}
        </FormControl>
      </Box>
    </Card>
  );
});

export default TodoContainer;
