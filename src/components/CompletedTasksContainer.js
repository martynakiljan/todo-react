/** @format */

import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Alert, Card } from "@mui/material";
import Grid from "@mui/material/Grid";

const CompletedTaskContainer = ({ tasks }) => {
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <Card sx={{ pt: 5, pb: 5, pr: 3, pl: 3 }}>
      {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <div className="completedTasks__inner">
          {completedTasks.length !== 0 ? (
            <ul className="list-container">
              {completedTasks.map((completeTask) => {
                console.log(completedTasks);
                return (
                  <div className="completeTask">
                    <li class="list-title list-title__completed">
                      {completeTask.text}
                    </li>
                    <button className="completeTask__btn">
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  </div>
                );
              })}
            </ul>
          ) : (
            <Alert severity="error" sx={{ m: 5 }}>
              No completed tasks :(
            </Alert>
          )}
        </div>
      </Grid>
    </Card>
  );
};

export default CompletedTaskContainer;
