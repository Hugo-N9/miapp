import React, { useState, useEffect } from 'react';
import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';
import { db } from '../../firebaseConfig';
import { 
  collection, query, orderBy, onSnapshot, 
  addDoc, doc, updateDoc, deleteDoc, serverTimestamp 
} from "firebase/firestore";

const TodoList = () => {
  const [tasks, setTasks] = useState([]); 
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);

  // --- LEER TAREAS ---
  useEffect(() => {
    const collectionRef = collection(db, "tasks");
    const q = query(collectionRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newTasks = [];
      querySnapshot.forEach((doc) => {
        newTasks.push({ 
          ...doc.data(), 
          id: doc.id 
        });
      });
      setTasks(newTasks);
    });

    return () => unsubscribe();
  }, []);

  // --- LEER HISTORIAL ---
  useEffect(() => {
    const collectionRef = collection(db, "taskHistory");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newHistory = [];
      querySnapshot.forEach((doc) => {
        newHistory.push({
          ...doc.data(),
          id: doc.id
        });
      });
      setHistory(newHistory);
    });

    return () => unsubscribe();
  }, []);

  // --- AÑADIR TAREA ---
  const handleAddTask = async (e) => { 
    e.preventDefault();
    if (inputValue.trim() === '') return;

    await addDoc(collection(db, "tasks"), {
      text: inputValue,
      isComplete: false,
      createdAt: serverTimestamp()
    });

    setInputValue('');
  };

  // --- MARCAR / DESMARCAR TAREA ---
  const handleToggleComplete = async (task) => {
    const taskRef = doc(db, "tasks", task.id);

    if (!task.isComplete) {
      await addDoc(collection(db, "taskHistory"), {
        text: task.text,
        type: "completed",
        createdAt: serverTimestamp()
      });
    }

    await updateDoc(taskRef, {
      isComplete: !task.isComplete
    });
  };

  // --- ELIMINAR TAREA ---
  const handleDeleteTask = async (idToDelete) => {
    const taskToDelete = tasks.find(t => t.id === idToDelete);

    if (taskToDelete) {
      await addDoc(collection(db, "taskHistory"), {
        text: taskToDelete.text,
        type: "deleted",
        createdAt: serverTimestamp()
      });
    }

    const taskRef = doc(db, "tasks", idToDelete);
    await deleteDoc(taskRef);
  };

  return (
    <div className="todo-list-container">
      <h2>Mi Lista de Tareas</h2>

      <form onSubmit={handleAddTask} className="add-task-form">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Añade una nueva tarea..."
        />
        <button type="submit">Añadir</button>
      </form>

      <ul>
        {tasks.map(task => (
          <TodoItem 
            key={task.id}
            task={task}
            onToggleComplete={() => handleToggleComplete(task)}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </ul>

      <h3>Historial de tareas</h3>
      <table className="history-table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Tarea</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td>{item.type === 'completed' ? 'Completada' : 'Eliminada'}</td>
              <td>{item.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;