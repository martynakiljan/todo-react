/** @format */
import { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Tooltip from "@mui/material/Tooltip";
import ClipLoader from "react-spinners/ClipLoader";
import React from "react";
import ConfirmationModal from "./ConfirmationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faPenToSquare,
  faHand,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../context/context";

const Todo = React.memo(
  ({
    task,
    completeTask,
    editTask,
    markAsImportant,
    dragstart,
    dragenter,
    deleteTask,
    drop,
    isEdited,
    moveUp,
    moveDown,
    index,
  }) => {
    const spinner = {
      display: "block",
      margin: "20px auto",
    };
    const [loading, setLoading] = useState(false);
    const { mode, theme } = useContext(ThemeContext);
    const [taskIdToDelete, setTaskIdToDelete] = useState(null);
    const [confirmation, setConfirmation] = useState(false);

    useEffect(() => {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }, []);

    const closeModalandDelete = () => {
      setConfirmation(false);
      deleteTask(taskIdToDelete);
    };

    const closeModalandDoNothing = () => {
      setConfirmation(false);
    };

    const showDeleteModal = (taskId) => {
      setTaskIdToDelete(taskId);
      setConfirmation(true);
    };

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
        ) : (
          <>
            {confirmation ? (
              <ConfirmationModal
                closeModalandDoNothing={closeModalandDoNothing}
                closeModalandDelete={closeModalandDelete}
              />
            ) : null}
            <li
              key={task.id}
              id={task.id}
              className={`list-item ${task.completed ? "completed" : ""} `}
              onDragStart={() => dragstart(task.id)}
              onDragEnter={() => dragenter(task.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => drop(e)}
              draggable
            >
              <div className="list-item__part1">
                <Checkbox
                  onChange={() => completeTask(task.id)}
                  color="primary"
                  inputProps={{ "aria-label": "controlled" }}
                  disabled={isEdited}
                />
                <h3
                  className={`list-title ${task.important ? "important" : ""} `}
                  color={
                    mode === "dark"
                      ? theme.palette.dark.main
                      : theme.palette.light.main
                  }
                >
                  {" "}
                  {task.text}
                </h3>
              </div>
              <div>
                <Tooltip title="you can edit this task!">
                  <Button
                    sx={{
                      minHeight: 0,
                      minWidth: 0,
                      padding: 2,
                    }}
                    onClick={() => editTask(task.completed, task.text, task.id)}
                    disabled={isEdited}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      color={
                        mode === "dark"
                          ? theme.palette.dark.main
                          : theme.palette.light.main
                      }
                    />
                  </Button>
                </Tooltip>
                <Tooltip title="you can delete this task!">
                  <Button
                    disabled={isEdited}
                    sx={{
                      minHeight: 0,
                      minWidth: 0,
                      padding: 2,
                      margin: 0,
                    }}
                    onClick={() => showDeleteModal(task.id)}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      color={
                        mode === "dark"
                          ? theme.palette.dark.main
                          : theme.palette.light.main
                      }
                    />
                  </Button>
                </Tooltip>
                <Button
                  disabled={isEdited}
                  sx={{
                    minHeight: 0,
                    minWidth: 0,
                    padding: 2,
                  }}
                >
                  <Tooltip title="you can move this task!">
                    <FontAwesomeIcon
                      icon={faHand}
                      color={
                        mode === "dark"
                          ? theme.palette.dark.main
                          : theme.palette.light.main
                      }
                    />
                  </Tooltip>
                </Button>
                <Tooltip title="move up!">
                  <Button
                    disabled={isEdited}
                    onClick={() => moveUp(index)}
                    sx={{
                      minHeight: 0,
                      minWidth: 0,
                      padding: 2,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faArrowUp}
                      color={
                        mode === "dark"
                          ? theme.palette.dark.main
                          : theme.palette.light.main
                      }
                    />
                  </Button>
                </Tooltip>
                <Tooltip title="move down!">
                  <Button
                    disabled={isEdited}
                    onClick={() => moveDown(index)}
                    sx={{
                      minHeight: 0,
                      minWidth: 0,
                      padding: 2,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faArrowDown}
                      color={
                        mode === "dark"
                          ? theme.palette.dark.main
                          : theme.palette.light.main
                      }
                    />
                  </Button>
                </Tooltip>
                <Button
                  disabled={isEdited}
                  onClick={() => markAsImportant(task.id)}
                  sx={{
                    minHeight: 0,
                    minWidth: 0,
                    padding: 2,
                  }}
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
          </>
        )}
      </>
    );
  }
);

export default Todo;
