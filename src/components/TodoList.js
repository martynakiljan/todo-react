/** @format */
import React from "react";
import Todo from "./Todo";

const TodoList = React.memo(
  ({
    tasks,
    completeTask,
    editTask,
    markAsImportant,
    showDeleteModal,
    dragstart,
    deleteTask,
    dragenter,
    drop,
    moveUp,
    moveDown,
  }) => {
    return (
      <>
        <ul className="list-container">
          {tasks.map((task, index) => (
            <Todo
              task={task}
              completeTask={completeTask}
              deleteTask={deleteTask}
              editTask={editTask}
              markAsImportant={markAsImportant}
              showDeleteModal={showDeleteModal}
              dragenter={dragenter}
              dragstart={dragstart}
              drop={drop}
              key={task.id}
              moveUp={moveUp}
              moveDown={moveDown}
            />
          ))}
        </ul>
      </>
    );
  }
);

export default TodoList;
