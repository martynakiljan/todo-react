/** @format */
import React from "react";
import Todo from "./Todo";

const TodoList = ({
  tasks,
  completeTask,
  editTask,
  markAsImportant,
  showDeleteModal,
}) => {
  return (
    <>
      <ul className="list-container">
        {tasks.map((task) => (
          <Todo
            task={task}
            completeTask={completeTask}
            editTask={editTask}
            markAsImportant={markAsImportant}
            showDeleteModal={showDeleteModal}
          />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
