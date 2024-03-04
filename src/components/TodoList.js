/** @format */
import React from "react";
import Todo from "./Todo";

const TodoList = ({
  tasks,
  completeTask,
  editTask,
  markAsImportant,
  showDeleteModal,
  dragstart,
  dragenter,
  drop,
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
            dragenter={dragenter}
            dragstart={dragstart}
            drop={drop}
            key={task.id}
          />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
