import { useState, useEffect } from 'react';
import './App.css';
import apiPath from './path';
import axios from "axios"

function App() {
  let [task, setTask] = useState({ username: "", email: "", address: "" });
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0)
  const [editingId, setEditingId] = useState(null); 
 
 
  const handleAddOrUpdate = async () => {
    if (editingId) {
      // Update user
      try {
        const res = await axios.put(`${apiPath()}/updateuser/${editingId}`, task);
        if (res.status === 200) {
          alert(res.data.msg);
          setCount(count + 1);
          setTask({ username: "", email: "", address: "" });
          setEditingId(null); 
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(`${apiPath()}/adduser`, task);
        if (res.status === 201) {
          setCount(count + 1);
          alert(res.data.msg);
          setTask({ username: "", email: "", address: "" });
        } else {
          alert(res.data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetch(`${apiPath()}/getuser`)
      .then(res => res.json())
      .then((out) => {
        setData(out);

      });
  }, [count]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${apiPath()}/deleteuser/${id}`);
      if (res.status === 200) {
        alert(res.data.msg);
        setCount(count + 1);
      }
    } catch (error) {
      console.log(error);

    }
  }

  const handleEdit = (id) => {
    const userToEdit = data.find((user) => user._id === id);
    setTask({ ...userToEdit }); 
    setEditingId(id); 
  };




  return (
    <div className="app-container">
      <div className="input-section">
        <input type="text" name="username" onChange={(e) => setTask((pre) => ({ ...pre, [e.target.name]: e.target.value }))} value={task.username} placeholder="Name" className="input-field1" />
        <input type="text" name="email" onChange={(e) => setTask((pre) => ({ ...pre, [e.target.name]: e.target.value }))} value={task.email} placeholder="Email" className="input-field1" />
        <input type="text" name="address" onChange={(e) => setTask((pre) => ({ ...pre, [e.target.name]: e.target.value }))} value={task.address} placeholder="address" className="input-field1" />
        <button className="add-button" onClick={handleAddOrUpdate}>
          {editingId ? "Update" : "Add"}
        </button>
      </div>
      <table className="item-table">
        <tbody>
          {data.map((item, ind) => (<tr key={ind}>
               <td>{item.username}</td>
               <td>{item.email}</td>
               <td>{item.address}</td>
               <td><button className="action-button" onClick={() => handleEdit(item._id)}>Edit</button>
               <button className="action-button delete-button" onClick={() => handleDelete(item._id)}>Delete</button></td>
              
            
          </tr>))}

        </tbody>
      </table>
    </div>
  );
};

export default App;