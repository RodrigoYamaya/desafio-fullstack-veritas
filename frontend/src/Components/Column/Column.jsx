// frontend/src/Components/Column/Column.jsx
import PropTypes from "prop-types";
import TaskCard from "../TaskCard/TaskCard";
import Editable from "../Editable/Editable"; 
import "./Column.css";

export default function Column({
  title,
  tasks = [],
  onCreate, 
  onUpdate,
  onDelete, 
  onMove,   
}) {
  const tituloParaStatus = {
    "A FAZER": "A fazer",
    "EM PROGRESSO": "Em Progresso", 
    "CONCLUÍDAS": "Concluídas"
  };

  const getDefaultStatus = () => {
    return tituloParaStatus[title] || "A fazer";
  };

  const handleCreate = (titulo) => {
    if (onCreate) {
      const status = getDefaultStatus();
      console.log(`➕ Criando tarefa na coluna "${title}" com status: "${status}"`);
      onCreate(titulo, status);
    }
  };

  const getColumnType = () => {
    const types = {
      "A FAZER": "todo",
      "EM PROGRESSO": "inprogress", 
      "CONCLUÍDAS": "done"
    };
    return types[title] || "todo";
  };

  return (
    <div className="column" data-column-type={getColumnType()}>
      <div className="column-header">
        <div className="column-title-group">
          <h3 className="column-title">{title}</h3>
          <span className="column-task-count">{tasks.length}</span>
        </div>
      </div>

      <div className="column-tasks">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.ID}
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))
        ) : (
          <div className="column-empty">
            📝 Nenhuma tarefa
            <br />
            <small>Status: {getDefaultStatus()}</small>
          </div>
        )}
      </div>

      <div className="column-footer">
        <Editable
          name="+ Adicionar Tarefa"
          placeholder="Digite o título da tarefa..."
          btnName="Adicionar"
          onSubmit={handleCreate}
        />
      </div>
    </div>
  );
}

Column.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onMove: PropTypes.func,
};

Column.defaultProps = {
  tasks: [],
};