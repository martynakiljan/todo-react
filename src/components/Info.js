/** @format */
import * as React from "react";
import Alert from "@mui/material/Alert";

const Info = ({ tasks }) => {
    const counterCompletedTasks = tasks.filter(
      (tasks) => tasks.completed
    ).length;
    const counterAllTasks = tasks.length;
    const counterImportantTasks = tasks.filter(
      (tasks) => tasks.important
    ).length;

  return (
    <>
      <Alert severity="info" sx={{ marginTop: 10 }}>
        <p>
          All tasks: <b>{counterAllTasks}</b>
        </p>
        <p>
          Completed tasks:{" "}
          <b>
            {counterCompletedTasks}/{counterAllTasks}
          </b>
        </p>
        <p>
          Important tasks: <b>{counterImportantTasks}</b>
        </p>
      </Alert>
    </>
  );
};

export default Info;
