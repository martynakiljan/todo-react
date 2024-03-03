/** @format */

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Tooltip from "@mui/material/Tooltip";

const Todo = (task, completeTask, editTask, deleteTask, markAsImportant) => {
  // console.log(task);

  //task.task bo dostaje object task i w srodku
  //jest jeszczce jeden task, wiec podmienilam wszedzie
  return (
    <>
      <li
        key={task.task.id}
        id={task.task.id}
        completed={task.task.completed}
        className={task.task.completed ? "list-item completed" : "list-item"}
      >
        <Checkbox
          onChange={completeTask}
          color="success"
          inputProps={{ "aria-label": "controlled" }}
        />
        <h3
          className={
            task.task.important ? "list-title important" : "list-title"
          }
        >
          {" "}
          {task.task.text}
        </h3>
        <div>
          <Button
            sx={{ m: 0.2, p: 0.5 }}
            variant="outlined"
            onClick={() =>
              editTask(task.task.completed, task.task.text, task.task.id)
            }
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
                  task.important
                    ? { color: "#d32f2f" }
                    : {
                        color: "text.disabled",
                      }
                }
              />
            </Tooltip>
          </Button>
        </div>
      </li>
    </>
  );
};

export default Todo;
