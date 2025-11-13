# 🗂️ Projeto Kanban de Tarefas (Frontend + Backend Go)

## 🧭 Visão Geral

Este projeto implementa um **Kanban interativo** com funcionalidades completas de **criação, atualização e movimentação de tarefas** entre colunas:
- 🟦 “A Fazer”
- 🟨 “Em Progresso”
- 🟩 “Concluído”

O **backend** é desenvolvido em **Go (Golang)** com **Gin**, e o **frontend** em **React**.

---

## ⚙️ Instruções para Rodar o Projeto

### 🖥️ Backend (API em Go)

1. Acesse a pasta do backend:
   ```bash
   cd backend

Instale as dependências:
go mod tidy


Execute o servidor:
go run main.go


A API ficará disponível em:
http://localhost:8080


💻 Frontend (React)

Acesse a pasta do frontend:
cd frontend


Instale as dependências:
npm install


Inicie o projeto:
npm run dev


Acesse o sistema em:
http://localhost:5173

🧱 Decisões Técnicas

Backend com Go + Gin: escolhido pela leveza, performance e simplicidade ao criar APIs RESTful.

Frontend com React: ideal para lidar com estados e renderizações dinâmicas de forma reativa.

Persistência temporária: as tarefas são armazenadas em memória (simulação de banco de dados).

CORS liberado: necessário para permitir comunicação local entre frontend e backend.



⚠️ Limitações Conhecidas

As tarefas não são salvas permanentemente (ao reiniciar o backend, elas são perdidas).

Existe uma limitação que as tarefas não podem ser arrastada para as demais colunas.

A movimentação entre colunas “Em Progresso” e “Concluído” ainda está em ajustes.


🚀 Melhorias Futuras

Adicionar banco de dados (Mysql ou PostgreSQL).

Implementar login e usuários diferentes e altenticação jwt.

permitir  movimentação das tarefas para outras colunas “A Fazer”, “Em Progresso” e “Concluído”.

Melhorar validações e mensagens de erro no frontend.

Adicionar testes automatizados (Go e React Testing Library).



👤 User Flow

O diagrama abaixo representa as principais ações do usuário dentro do sistema Kanban:


![Fluxo do Usuário](image.png)




Descrição do fluxo:

Usuário acessa o sistema.

Visualiza as colunas do Kanban.

Cria uma nova tarefa → aparece em “A Fazer”.

Move tarefa para “Em Progresso”.

Conclui tarefa → aparece em “Concluído”.

🔁 Fluxo de Dados (Frontend ↔ Backend)
[Usuário] 
    ↓
[Frontend React]
    ↓  (requisição HTTP)
[API Go/Gin]
    ↓  (processa dados em memória)
[Resposta JSON]
    ↓
[Frontend React atualiza Kanban]


Explicação:

O usuário cria, atualiza ou exclui uma tarefa no frontend.

O React envia requisições via API REST para o backend em Go.

O backend processa as tarefas (armazenadas em memória).

O frontend atualiza o estado do Kanban com base na resposta JSON retornada.



📁 Estrutura do Projeto
projeto-kanban
│
├── backend
│   ├── main.go
│   ├── handelers.go
│   ├── tasks.json (opcional)
│   └── models.go
│
├── frontend/
│   ├── src/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── AddTask/
│   │   │   │   ├── AddTaskForm.jsx
│   │   │   │   └── AddTask.css
│   │   │   ├── Column/
│   │   │   │   ├── Column.jsx
│   │   │   │   └── Column.css
│   │   │   ├── Editable/
│   │   │   │   ├── Editable.jsx
│   │   │   │   └── Editable.css
│   │   │   └── TaskCard/
│   │   │       ├── TaskCard.jsx
│   │   │       └── TaskCard.css
│   └── package.json
│
└── README.md
