/** @format */
import React from "react";
import Todo from "./Todo";

const TodoList = ({
  tasks,
  deleteTask,
  completeTask,
  editTask,
  markAsImportant,
}) => {
  return (
            <>
              <ul className="list-container">
                {tasks.map((task) => (
                  <Todo
                    task={task}
                    completeTask={completeTask}
                    editTask={editTask}
                    deleteTask={deleteTask}
                    markAsImportant={markAsImportant}
                  />
                ))}
              </ul>
            </>
  );
};

export default TodoList;
