/** @format */
import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Tooltip from "@mui/material/Tooltip";

const TodoList = ({
  tasks,
  deleteTask,
  completeTask,
  editTask,
  isImportant,
  markAsImportant,
}) => {
  // console.log(isImportant); dlaczego tyle razy sie to renderuje
  console.log(isImportant);
  
  return (
    <>
      <ul className="list-container">
        {tasks.map((task) => {
          return (
            <>
              <li
                className={
                  task.completed
                    ? "list-item completed"
                    : "list-item" || task.isImportant
                    ? "list-item important"
                    : "list-item"
                }
                key={task.id}
                id={task.id}
                completed={task.completed}
              >
                <Checkbox
                  onChange={completeTask}
                  color="success"
                  inputProps={{ "aria-label": "controlled" }}
                />
                <h3
                  className={
                    isImportant ? "list-title important" : "list-title"
                  }
                >
                  {" "}
                  {task.text}
                </h3>
                <div>
                  <Button
                    sx={{ m: 0.2, p: 0.5 }}
                    variant="outlined"
                    onClick={editTask}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{ m: 0.2, p: 0.5 }}
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={deleteTask}
                  >
                    Delete
                  </Button>
                  <Button onClick={markAsImportant}>
                    <Tooltip title="mark as important!">
                      <PriorityHighIcon
                        sx={
                          isImportant
                            ? { color: "text.error" }
                            : { color: "text.disabled" }
                        }
                      />
                    </Tooltip>
                  </Button>
                </div>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;
