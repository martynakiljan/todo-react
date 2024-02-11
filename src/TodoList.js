/** @format */
import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TodoList = ({ tasks, deleteTask, completeTask, editTask, editText }) => {
  return (
    <ul className="list-container">
      {tasks.map((task) => {
        console.log(task);
        return (
          <li
            className={task.completed ? "list-item completed" : "list-item"}
            key={task.id}
            id={task.id}
            completed={task.completed}
            focusColor="red"
          >
            <h3 className="list-title"> {task.text}</h3>
            <div>
              <Button
                sx={{ m: 0.2 }}
                variant="contained"
                color="success"
                onClick={completeTask}
              >
                COMPLETED
              </Button>
              <Button
                sx={{ m: 0.2 }}
                variant="outlined"
                onClick={editTask}
                startIcon={<EditIcon />}
              >
                {!editText ? <span>Edit</span> : <span>Save</span>}
              </Button>
              <Button
                sx={{ m: 0.2 }}
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={deleteTask}
              >
                Delete
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
