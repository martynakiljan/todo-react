/** @format */
import * as React from "react";
import Alert from "@mui/material/Alert";

const Info = ({ tasks }) => {
  let counterCompletedTasks = 0;
  let counterAllTasks = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed == true) counterCompletedTasks++;
    if (tasks) counterAllTasks++;
  }

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
      </Alert>
    </>
  );
};

export default Info;
