import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

export default function TaskCard({ task, index, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  function save() {
    const t = title.trim();
    if (t && t !== task.title) onEdit(task.id, t);
    setEditing(false);
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task ${snapshot.isDragging ? "dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {editing ? (
            <div className="task-edit">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && save()}
                autoFocus
              />
              <div className="task-actions">
                <button onClick={save}>Save</button>
                <button className="ghost" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="task-title">{task.title}</div>
              <div className="task-actions">
                <button onClick={() => setEditing(true)}>Edit</button>
                <button className="danger" onClick={() => onDelete(task.id)}>
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}
