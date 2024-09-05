import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, updateUser } from "./redux/userSlice";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setage] = useState("");
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const handleAddUser = () => {
    if (name && age) {
      dispatch(addUser({ id: Date.now(), name, age }));
      setName("");
      setage("");
    }
  };

  const handleUpdateUser = () => {
    if (editId && name && age) {
      dispatch(updateUser({ id: editId, name, age }));
      setEditId(null);
      setName("");
      setage("");
    }
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
    setage(user.age);
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="age"
        value={age}
        onChange={(e) => setage(e.target.value)}
      />
      <button onClick={editId ? handleUpdateUser : handleAddUser}>
        {editId ? "Update User" : "Add User"}
      </button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.age}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => dispatch(deleteUser(user.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
