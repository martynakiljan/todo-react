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
    dragenter,
    lastAddedTaskId,
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
              lastAddedTaskId={lastAddedTaskId}
            />
          ))}
        </ul>
      </>
    );
  }
);

export default TodoList;
