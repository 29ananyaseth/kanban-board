import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

export default function Column({ column, tasks, onEdit, onDelete }) {
  return (
    <div className="column">
      <h2 className="column-title">{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`column-body ${snapshot.isDraggingOver ? "drag-over" : ""}`}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
