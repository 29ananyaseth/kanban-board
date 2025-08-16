import { useState } from "react";

export default function AddTaskForm({ onAdd }) {
  const [value, setValue] = useState("");

  function submit(e) {
    e.preventDefault();
    const title = value.trim();
    if (!title) return;
    onAdd(title);
    setValue("");
  }

  return (
    <form className="add-form" onSubmit={submit}>
      <input
        placeholder="Add a task to 'To Do'…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
