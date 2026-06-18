import { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [taskMessage, setTaskMessage] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
const [editTitle, setEditTitle] = useState("");
const [editDescription, setEditDescription] = useState("");

  const getTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/tasks"
      );

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async () => {
    try {
      await axios.post(
        "http://localhost:5000/tasks",
        {
          title,
          description,
          status: "To Do",
        }
      );

      setTitle("");
      setDescription("");
;

setTimeout(() => {
  setMessage("");
}, 1500);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/tasks/${id}`
      );
      

setTimeout(() => {
  setMessage("");
}, 1500);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };
const editTask = async (id) => {
  try {
    await axios.put(
      `http://localhost:5000/tasks/${id}`,
      {
        title: editTitle,
        description: editDescription,
      }
    );

    setEditId(null);

    getTasks();
  } catch (error) {
    console.log(error);
  }
};
  const updateStatus = async (task) => {
    let newStatus = "To Do";

    if (task.status === "To Do") {
      newStatus = "In Progress";
    } else if (task.status === "In Progress") {
      newStatus = "Completed";
    }

    try {
      await axios.put(
        `http://localhost:5000/tasks/${task._id}`,
        {
          status: newStatus,
        }
      );
setTaskMessage({
  id: task._id,
  text: "✅ Task Updated!"
});

setTimeout(() => {
  setTaskMessage({});
}, 1500);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setMessage("Logged out successfully!");

    localStorage.removeItem("token");

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    getTasks();
  }, []);

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Task Manager
        </h1>
        
        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>
       {message && (
  <p className="success-message">
    {message}
  </p>
)}
      

      <div className="task-form">
        <h2>Create Task</h2>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <button
          className="create-btn"
          onClick={createTask}
        >
          Create Task
        </button>
      </div>

      <h2 style={{ marginTop: "30px" }}>
  My Tasks ({tasks.length})
</h2>
<input
  type="text"
  placeholder="🔍 Search Tasks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="search-input"
/>

      {tasks.length === 0 ? (
  <div className="empty-state">
    <h3>📋 No Tasks Yet</h3>
    <p>Create your first task to get started!</p>
  </div>
) : (
  tasks
  .filter((task) =>
    task.title
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((task) => (
    <div
      key={task._id}
      className="task-card"
    >
      {editId === task._id ? (
  <div className="edit-form">
    <label>Task Title</label>

    <input
      className="edit-input"
      value={editTitle}
      onChange={(e) =>
        setEditTitle(e.target.value)
      }
    />

    <label>Description</label>

    <textarea
      className="edit-textarea"
      value={editDescription}
      onChange={(e) =>
        setEditDescription(e.target.value)
      }
    />

    <div className="edit-buttons">
      <button
        className="save-btn"
        onClick={() => editTask(task._id)}
      >
         Save
      </button>

      <button
        className="cancel-btn"
        onClick={() => setEditId(null)}
      >
         Cancel
      </button>
    </div>
  </div>
) : (
  <>
    <h3>{task.title}</h3>
    <p>{task.description}</p>
  </>
)}
       <p
  className={`status-badge ${task.status.replace(
    " ",
    "-"
  )}`}
>
  {task.status}
</p>

      {taskMessage?.id === task._id && (
  <p className="task-message">
    {taskMessage.text}
  </p>
)}   <button
  className="edit-btn"
  onClick={() => {
    setEditId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  }}
>
  Edit
</button>

      <button
        className="update-btn"
        onClick={() => updateStatus(task)}
      >
        Update Status
      </button>

      <button
  className="delete-btn"
  onClick={() => {
    if (
      window.confirm(
        "Are you sure you want to delete this task?"
      )
    ) {
      deleteTask(task._id);
    }
  }}
>
  Delete
</button>
    </div>
  ))
)}
<footer className="footer">
  Built with React • Node.js • MongoDB
</footer>
    </div>
  );
}

export default Dashboard;