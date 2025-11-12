// frontend/src/Components/TaskCard/TaskCard.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./TaskCard.css";

export default function TaskCard({ task, onUpdate, onDelete, onMove }) {
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(""); 
  const [descricao, setDescricao] = useState(""); 

  useEffect(() => {
    if (task) {
      setTitulo(task.Title || "");
      setDescricao(task.Description || "");
    }
  }, [task, editando]);

  if (!task) return null;

  const salvar = () => {
    if (!titulo.trim()) {
      alert("O título da tarefa é obrigatório!");
      return;
    }
    
    const atualizacoes = {
      Title: titulo.trim(), 
      Description: descricao 
    };
    
    console.log('Salvando edição da tarefa:', task.ID, atualizacoes);
    onUpdate(task.ID, atualizacoes);
    setEditando(false);
  };
  
  const cancelarEdicao = () => {
    setTitulo(task.Title || "");
    setDescricao(task.Description || "");
    setEditando(false);
  };

  const STATUS_A_FAZER = "A fazer";
  const STATUS_EM_PROGRESSO = "Em Progresso";
  const STATUS_CONCLUIDAS = "Concluídas";

  return (
    <div className="task-card" data-status={task.Status}>
      {editando ? (
        <div className="task-edit">
          <h4>✏️ Editando Tarefa</h4>
          <div className="form-group">
            <label>Título:</label>
            <input 
              value={titulo} 
              onChange={(e) => setTitulo(e.target.value)} 
              placeholder="Título da tarefa" 
              className="editable-input" 
            />
          </div>
          <div className="form-group">
            <label>Descrição:</label>
            <textarea 
              value={descricao} 
              onChange={(e) => setDescricao(e.target.value)} 
              placeholder="Descrição (opcional)" 
              className="editable-input" 
              rows="3"
            />
          </div>
          <div className="task-actions editable-controls">
            <button className="btn btn-primary" onClick={salvar}>
              💾 Salvar
            </button>
            <button className="btn btn-secondary" onClick={cancelarEdicao}>
              ❌ Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-card-header">
            <strong className="task-title">{task.Title}</strong>
            <button 
              className="task-options-btn" 
              onClick={() => setEditando(true)} 
              title="Editar tarefa"
            >
              ✏️
            </button> 
          </div>
          
          {task.Description && (
            <p className="task-description">{task.Description}</p>
          )}

          <div className="task-meta">
            <small className="task-id">ID: {task.ID}</small>
            <small className="task-status">Status: {task.Status}</small>
          </div>

          <div className="task-controls">
            <div className="move-controls">
              {}
              {task.Status !== STATUS_A_FAZER && (
                <button 
                  className="btn btn-move btn-sm" 
                  onClick={() => onMove(task.ID, STATUS_A_FAZER)}
                  title="Mover para A Fazer"
                >
                  ⬅️ A Fazer
                </button>
              )}
              
              {task.Status !== STATUS_EM_PROGRESSO && (
                <button 
                  className="btn btn-move btn-sm" 
                  onClick={() => onMove(task.ID, STATUS_EM_PROGRESSO)}
                  title={task.Status === STATUS_A_FAZER ? "Mover para Em Progresso" : "Voltar para Em Progresso"}
                >
                  {task.Status === STATUS_A_FAZER ? "➡️ Em Progresso" : "⬅️ Em Progresso"}
                </button>
              )}
              
              {task.Status !== STATUS_CONCLUIDAS && (
                <button 
                  className="btn btn-move btn-sm" 
                  onClick={() => onMove(task.ID, STATUS_CONCLUIDAS)}
                  title="Mover para Concluídas"
                >
                  ✅ Concluir
                </button>
              )}
            </div>
            
            <div className="action-controls">
              <button 
                className="btn btn-danger btn-sm" 
                onClick={() => {
                  if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
                    console.log('Confirmada exclusão da tarefa:', task.ID);
                    onDelete(task.ID);
                  }
                }}
                title="Excluir tarefa"
              >
                🗑️ Excluir
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    ID: PropTypes.string.isRequired,
    Title: PropTypes.string,
    Description: PropTypes.string,
    Status: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
};