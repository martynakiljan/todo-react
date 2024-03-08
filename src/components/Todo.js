/** @format */
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Tooltip from "@mui/material/Tooltip";
import ClipLoader from "react-spinners/ClipLoader";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faPenToSquare,
  faHand,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Todo = React.memo(
  ({
    task,
    completeTask,
    editTask,
    markAsImportant,
    showDeleteModal,
    dragstart,
    dragenter,
    lastAddedTaskId,
    drop,
    moveUp,
    moveDown,
    index,
  }) => {
    const spinner = {
      display: "block",
      margin: "20px auto",
    };
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //   czemu ten kod nie dziala a ten na dole dziala?
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 1000);
    // }, []);

    useEffect(() => {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }, []);

    console.log(task);
    return (
      <>
        {loading ? (
          <ClipLoader
            color="#1976d2"
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            cssOverride={spinner}
            data-testid="loader"
          />
        ) : lastAddedTaskId ? (
          <li
            key={task.id}
            id={task.id}
            className={task.completed ? "list-item completed" : "list-item"}
            onDragStart={(e) => dragstart(e, task.id)}
            onDragEnter={(e) => dragenter(e)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => drop(e)}
            draggable
          >
            <div className="list-item__part1">
              <Checkbox
                onChange={() => completeTask(task.id)}
                color="primary"
                inputProps={{ "aria-label": "controlled" }}
              />
              <h3
                className={
                  task.important ? "list-title important" : "list-title"
                }
              >
                {" "}
                {task.text}
              </h3>
            </div>
            <div>
              <Button
                sx={{ minHeight: 0, minWidth: 0, padding: 2 }}
                onClick={() => editTask(task.completed, task.text, task.id)}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
              <Button
                sx={{ minHeight: 0, minWidth: 0, padding: 2, margin: 0 }}
                startIcon={<DeleteIcon />}
                onClick={() => showDeleteModal(task.id)}
              ></Button>
              <Button sx={{ minHeight: 0, minWidth: 0, padding: 2 }}>
                <Tooltip title="you can move this task!">
                  <FontAwesomeIcon icon={faHand} />
                </Tooltip>
              </Button>
              <Tooltip title="move up!">
                <Button
                  onClick={() => moveUp(index)}
                  sx={{ minHeight: 0, minWidth: 0, padding: 2 }}
                >
                  <FontAwesomeIcon icon={faArrowUp} />
                </Button>
              </Tooltip>
              <Tooltip title="move down!">
                <Button
                  onClick={() => moveDown(index)}
                  sx={{ minHeight: 0, minWidth: 0, padding: 2 }}
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                </Button>
              </Tooltip>
              <Button
                onClick={() => markAsImportant(task.id)}
                sx={{ minHeight: 0, minWidth: 0, padding: 2 }}
              >
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
        ) : null}
      </>
    );
  }
);

export default Todo;
