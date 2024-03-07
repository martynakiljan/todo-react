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
            <Checkbox
              onChange={() => completeTask(task.id)}
              color="success"
              inputProps={{ "aria-label": "controlled" }}
            />
            <h3
              className={task.important ? "list-title important" : "list-title"}
            >
              {" "}
              {task.text}
            </h3>
            <div>
              <Button
                onClick={() => editTask(task.completed, task.text, task.id)}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                onClick={() => showDeleteModal(task.id)}
              >
                <FontAwesomeIcon icon="fa-solid fa-trash" />
              </Button>

              <Button onClick={() => markAsImportant(task.id)}>
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

              <Button>
                <Tooltip title="you can move this task!">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                  >
                    <g>
                      <rect fill="none" height="24" width="24" />
                    </g>
                    <g>
                      <path d="M20.22,10l-4.15,0.01c-0.16-0.01-0.31,0.02-0.45,0.08l-0.59,0.26L13.2,6.25c-0.56-1.26-2.04-1.83-3.3-1.27 s-1.83,2.04-1.27,3.3l3.3,7.45l-1.87,0.39c-0.19,0.05-0.99,0.27-1.36,1.21L8,19.19l6.78,2.67c0.49,0.19,1.05,0.18,1.53-0.04 l5.99-2.65c0.89-0.4,1.37-1.38,1.13-2.32l-1.36-5.34C21.85,10.65,21.1,10.04,20.22,10z M21.49,17.34L15.5,20l-4.92-1.96l4.18-0.88 l-4.3-9.7c-0.11-0.25,0-0.55,0.25-0.66c0.25-0.11,0.55,0,0.66,0.25l2.5,5.65l1.61-0.71L20.13,12L21.49,17.34z M2.06,5.56L1,4.5 L4.5,1L8,4.5L6.94,5.56L5.32,3.94C5.11,4.76,5,5.62,5,6.5c0,2.42,0.82,4.65,2.2,6.43L6.13,14C4.49,11.95,3.5,9.34,3.5,6.5 c0-0.92,0.1-1.82,0.3-2.68L2.06,5.56z" />
                    </g>
                  </svg>
                </Tooltip>
              </Button>

              <Tooltip title="move up!">
                <Button onClick={() => moveUp(index)}>
                  <FontAwesomeIcon icon={faArrowUp} />
                </Button>
              </Tooltip>
              <Tooltip title="move down!">
                <Button onClick={() => moveDown(index)}>
                  <FontAwesomeIcon icon={faArrowDown} />
                </Button>
              </Tooltip>
            </div>
          </li>
        ) : null}
      </>
    );
  }
);

export default Todo;
