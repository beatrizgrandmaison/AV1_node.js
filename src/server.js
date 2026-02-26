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

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});