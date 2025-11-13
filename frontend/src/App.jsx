import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import Column from "./Components/Column/Column";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const colunasFixas = [
    { status: "A fazer", title: "A FAZER" },
    { status: "Em andamento", title: "EM ANDAMENTO" },
    { status: "Concluída", title: "CONCLUÍDA" },
  ];

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      console.log("Todas as tarefas:", tasks);
      console.log("Status únicos:", [...new Set(tasks.map((t) => t.Status))]);

      const statusPossiveis = ["A fazer", "Em andamento", "Concluída"];
      statusPossiveis.forEach((status) => {
        const tarefasComStatus = tasks.filter((t) => t.Status === status);
        console.log(`Tarefas com status "${status}":`, tarefasComStatus.length, tarefasComStatus);
      });
    }
  }, [tasks]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      console.log("🔄 Carregando tarefas...");
      const data = await getTasks();
      console.log("✅ Tarefas recebidas do backend:", data);

      const tarefasNormalizadas = data.map((t) => ({
        ID: t.id,
        Title: t.title,
        Description: t.description,
        Status: t.status,
        CreatedAt: t.createdAt,
      }));

      setTasks(tarefasNormalizadas);
      setError(null);
    } catch (err) {
      const errorMsg = "Erro ao carregar tarefas: Verifique se o Backend (Go) está ativo.";
      setError(errorMsg);
      console.error("❌ Erro ao carregar tarefas:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (titulo, status) => {
    if (!titulo.trim()) {
      alert("Por favor, digite um título para a tarefa!");
      return;
    }

    try {
      console.log("➕ Criando tarefa:", { Title: titulo, Status: status });

      const newTask = await createTask({
        title: titulo,
        description: "",
        status: status,
      });

      console.log("✅ Tarefa criada:", newTask);

      const tarefaNormalizada = {
        ID: newTask.id,
        Title: newTask.title,
        Description: newTask.description,
        Status: newTask.status,
        CreatedAt: newTask.createdAt,
      };

      setTasks((prev) => [...prev, tarefaNormalizada]);
      setError(null);
    } catch (e) {
      const errorMessage = e.response?.data?.message || e.message;
      const errorMsg = "Erro ao criar tarefa: " + errorMessage;
      setError(errorMsg);
      console.error("❌ Erro ao criar tarefa:", e);
    }
  };

  const handleUpdate = async (id, atualizacoes) => {
    try {
      console.log("✏️ Atualizando tarefa:", id, atualizacoes);

      const updated = await updateTask(id, atualizacoes);
      console.log("✅ Tarefa atualizada:", updated);

      const tarefaNormalizada = {
        ID: updated.id,
        Title: updated.title,
        Description: updated.description,
        Status: updated.status,
        CreatedAt: updated.createdAt,
      };

      setTasks((prev) => prev.map((t) => (t.ID === id ? tarefaNormalizada : t)));
      setError(null);
    } catch (e) {
      const errorMessage = e.response?.data?.message || e.message;
      const errorMsg = "Erro ao atualizar tarefa: " + errorMessage;
      setError(errorMsg);
      console.error("❌ Erro ao atualizar tarefa:", e);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("🗑️ Deletando tarefa:", id);
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.ID !== id));
      setError(null);
      console.log("✅ Tarefa deletada");
    } catch (e) {
      const errorMessage = e.response?.data?.message || e.message;
      const errorMsg = "Erro ao deletar tarefa: " + errorMessage;
      setError(errorMsg);
      console.error("❌ Erro ao deletar tarefa:", e);
    }
  };

  const handleMove = async (id, novoStatus) => {
    try {
      console.log("🔄 Movendo tarefa:", id, "para:", novoStatus);
      
      const tarefaAtual = tasks.find(t => t.ID === id);
      if (!tarefaAtual) {
        throw new Error("Tarefa não encontrada");
      }

      const dadosAtualizacao = {
        title: tarefaAtual.Title,
        description: tarefaAtual.Description || "",
        status: novoStatus
      };

      console.log("📤 Dados enviados para update:", dadosAtualizacao);

      const updated = await updateTask(id, dadosAtualizacao);
      console.log("✅ Tarefa movida:", updated);

      setTasks((prev) => 
        prev.map((t) => 
          t.ID === id 
            ? { 
                ...t, 
                Status: novoStatus,
                Title: updated.title,
                Description: updated.description
              }
            : t
        )
      );
      setError(null);
    } catch (e) {
      const errorMessage = e.response?.data?.message || e.message;
      const errorMsg = "Erro ao mover tarefa: " + errorMessage;
      setError(errorMsg);
      console.error("❌ Erro ao mover tarefa:", e);
      loadTasks();
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="feedback-loading">
          <div className="loading-spinner"></div>
          <p>Carregando tarefas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <p className="feedback-error">{error}</p>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button className="btn btn-primary" onClick={loadTasks} style={{ marginRight: "10px" }}>
            🔄 Tentar Novamente
          </button>
          <button className="btn btn-secondary" onClick={() => setError(null)}>
            ❌ Fechar Erro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Quadro Kanban</h1>
      <p className="subtitle">Organize suas tarefas de forma simples e eficiente</p>

      <div className="debug-info">
        <strong>🔍 DEBUG:</strong>
        <br />• Total de tarefas: {tasks.length}
        <br />• Colunas:{" "}
        {colunasFixas
          .map((col) => `${col.title} (${tasks.filter((t) => t.Status === col.status).length})`)
          .join(" | ")}
        <br />• Status únicos no backend: {[...new Set(tasks.map((t) => t.Status))].join(", ")}
      </div>

      <div className="columns">
        {colunasFixas.map(({ status, title }) => {
          const tarefasNaColuna = tasks.filter((t) => t.Status === status);
          console.log(`🎯 Coluna "${title}" (status: "${status}"):`, tarefasNaColuna.length, "tarefas");

          return (
            <Column
              key={status}
              title={title}
              status={status} 
              tasks={tarefasNaColuna}
              onCreate={handleCreate}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onMove={handleMove}
            />
          );
        })}
      </div>
    </div>
  );
}