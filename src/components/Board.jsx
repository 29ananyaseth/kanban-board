import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import { useLocalStorage } from "../hooks/useLocalStorage";
import AddTaskForm from "./AddTaskForm";

const DEFAULT_STATE = {
  columns: {
    todo: { id: "todo", title: "To Do", taskIds: [] },
    inprogress: { id: "inprogress", title: "In Progress", taskIds: [] },
    done: { id: "done", title: "Done", taskIds: [] },
  },
  columnOrder: ["todo", "inprogress", "done"],
  tasks: {},
};

export default function Board() {
  const [state, setState] = useLocalStorage("kanban-state-v1", DEFAULT_STATE);

  function addTask(title) {
    const id = crypto.randomUUID();
    const newTask = { id, title: title.trim() };
    setState(prev => ({
      ...prev,
      tasks: { ...prev.tasks, [id]: newTask },
      columns: {
        ...prev.columns,
        todo: { ...prev.columns.todo, taskIds: [id, ...prev.columns.todo.taskIds] }
      }
    }));
  }

  function editTask(id, title) {
    setState(prev => ({
      ...prev,
      tasks: { ...prev.tasks, [id]: { ...prev.tasks[id], title } }
    }));
  }

  function deleteTask(id) {
    setState(prev => {
      const columns = Object.fromEntries(
        Object.entries(prev.columns).map(([cid, col]) => [
          cid,
          { ...col, taskIds: col.taskIds.filter(tid => tid !== id) }
        ])
      );
      const tasks = { ...prev.tasks };
      delete tasks[id];
      return { ...prev, tasks, columns };
    });
  }

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    setState(prev => {
      const startCol = prev.columns[source.droppableId];
      const finishCol = prev.columns[destination.droppableId];

      if (startCol === finishCol) {
        const newTaskIds = Array.from(startCol.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = { ...startCol, taskIds: newTaskIds };
        return {
          ...prev,
          columns: { ...prev.columns, [newColumn.id]: newColumn }
        };
      }

      const startTaskIds = Array.from(startCol.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = { ...startCol, taskIds: startTaskIds };

      const finishTaskIds = Array.from(finishCol.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = { ...finishCol, taskIds: finishTaskIds };

      return {
        ...prev,
        columns: {
          ...prev.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      };
    });
  }

  return (
    <>
      <AddTaskForm onAdd={addTask} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {state.columnOrder.map(colId => {
            const column = state.columns[colId];
            const tasks = column.taskIds.map(tid => state.tasks[tid]).filter(Boolean);
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                onEdit={editTask}
                onDelete={deleteTask}
              />
            );
          })}
        </div>
      </DragDropContext>
    </>
  );
}
