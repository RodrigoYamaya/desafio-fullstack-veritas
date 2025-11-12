import { useState } from "react";
import PropTypes from "prop-types";

const AddTaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = { id: Date.now(), title, description };
    onAdd(newTask);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-gray-100 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Adicionar Tarefa</h3>
      <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Descrição (opcional)" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Adicionar</button>
    </form>
  );
};

AddTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddTaskForm;
