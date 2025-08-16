import Board from "./components/Board";
import "./styles.css";

export default function App() {
  return (
    <div className="container">
      <h1>Kanban Board</h1>
      <p className="subtitle">React-only • Drag & drop • Task Manager</p>
      <Board />
      <footer className="footer">
        <a href="https://github.com" target="_blank" rel="noreferrer">
          Made by Ananya Seth
        </a>
      </footer>
    </div>
  );
}
