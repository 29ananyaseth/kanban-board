# 📌 Kanban Board – React Only (Trello Clone)

A simple **Kanban Board** built with **React + Vite**, featuring drag & drop, task editing, deletion, and persistence using localStorage.  
Think of it as a lightweight **Trello clone** — great for learning **React state, hooks, and drag & drop libraries**.

---

## Deployment Link:

https://kanban-board-bice-theta.vercel.app/

---


## ✨ Features
- ➕ **Add tasks** into the **To Do** column  
- ✏️ **Edit tasks** inline  
- ❌ **Delete tasks**  
- 📥 **Drag & drop** tasks between columns (`@hello-pangea/dnd`)  
- 💾 **Data persistence** via browser **localStorage**  
- 📱 **Responsive layout** (works on desktop & mobile)  

---

## 🛠️ Tech Stack
- **Frontend:** React + Vite  
- **Drag & Drop:** [`@hello-pangea/dnd`](https://github.com/hello-pangea/dnd) (React 19 compatible fork of react-beautiful-dnd)  
- **State Management:** React hooks (`useState`, `useEffect`)  
- **Persistence:** Custom `useLocalStorage` hook  
- **Styling:** Plain CSS  

---

## 📂 Project Structure
src/

components/

Board.jsx

Column.jsx

TaskCard.jsx

AddTaskForm.jsx

hooks/

useLocalStorage.js

App.jsx

main.jsx

styles.css

## 🚀 Getting Started

### 1. Clone repo

git clone https://github.com/<your-username>/kanban-board.git
cd kanban-board

### 2. Install dependencies

npm install

### 3. Run dev server

npm run dev

--------

Open 👉 http://localhost:5173



