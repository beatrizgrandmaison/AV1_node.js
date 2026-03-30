import express from "express";
import { tarefas } from "./dados.js";

const app = express();
const PORTA = 3000;

app.use(express.json());

/* ------------------ GET ------------------ */
app.get("/tarefas", (req, res) => {
  res.status(200).json(tarefas);
});

/* ------------------ POST ------------------ */
app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;

  /* Validação */
  if (!titulo) {
    return res.status(400).json({
      erro: "O campo 'titulo' é obrigatório"
    });
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    titulo
  };

  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});

/* ------------------ PUT ------------------ */
app.put("/tarefas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo } = req.body;

  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }
  if (!titulo) {
    return res.status(400).json({ erro: "O campo 'titulo' é obrigatório" });
  }
  tarefa.titulo = titulo;
  res.status(200).json(tarefa);
});

/* ------------------ DELETE ------------------ */
app.delete("/tarefas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }
  tarefas.splice(index, 1);
  res.status(200).json({ mensagem: "Tarefa removida com sucesso" });
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});