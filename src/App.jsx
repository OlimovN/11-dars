import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, updateUser } from "./redux/userSlice";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const validateInputs = () => {
    if (!name.trim()) {
      setError("Name is required.");
      return false;
    }
    if (!age || isNaN(age) || age <= 0) {
      setError("Please enter a valid age.");
      return false;
    }
    setError("");
    return true;
  };

  const handleAddUser = () => {
    if (validateInputs()) {
      dispatch(addUser({ id: Date.now(), name, age: parseInt(age, 10) }));
      setName("");
      setAge("");
    }
  };

  const handleUpdateUser = () => {
    if (validateInputs() && editId) {
      dispatch(updateUser({ id: editId, name, age: parseInt(age, 10) }));
      setEditId(null);
      setName("");
      setAge("");
    }
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
    setAge(user.age);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <div className="app">
      <h1 className="app-title">User Management</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input-field"
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button
          className={`action-button ${editId ? "update-button" : "add-button"}`}
          onClick={editId ? handleUpdateUser : handleAddUser}
        >
          {editId ? "Update User" : "Add User"}
        </button>
      </div>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <span className="user-info">
              {user.name} - {user.age}
            </span>
            <button className="edit-button" onClick={() => handleEdit(user)}>
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
