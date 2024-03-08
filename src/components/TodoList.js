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
              editTask={editTask}
              markAsImportant={markAsImportant}
              showDeleteModal={showDeleteModal}
              dragenter={dragenter}
              dragstart={dragstart}
              drop={drop}
              key={task.id}
              lastAddedTaskId={lastAddedTaskId}
              moveUp={() => moveUp(index)}
              moveDown={() => moveDown(index)}
            />
          ))}
        </ul>
      </>
    );
  }
);

export default TodoList;
