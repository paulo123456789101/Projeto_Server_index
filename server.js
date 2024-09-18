const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

// Configura o servidor para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configura o servidor para aceitar dados de formulário (POST)
app.use(express.urlencoded({ extended: true }));

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',   
  password: '',   
  database: 'formulario' 
});

// Verifica a conexão com o banco de dados
connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida.');
});

// Rota para adicionar cliente
app.post('/add', (req, res) => {
  const { codigo, nome, email } = req.body;
  const sql = 'INSERT INTO formulario (codigo, nome, email) VALUES (?, ?, ?)';
  connection.query(sql, [codigo, nome, email], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar cliente:', err);
      res.status(500).send('Erro ao adicionar cliente.');
      return;
    }
    res.send('Cliente adicionado com sucesso!');
  });
});

// Rota para excluir cliente
app.post('/delete', (req, res) => {
  const { codigo } = req.body;
  const sql = 'DELETE FROM formulario WHERE codigo = ?';
  connection.query(sql, [codigo], (err, result) => {
    if (err) {
      console.error('Erro ao excluir cliente:', err);
      res.status(500).send('Erro ao excluir cliente.');
      return;
    }
    res.send('Cliente excluído com sucesso!');
  });
});

// Rota para listar clientes
app.get('/clientes', (req, res) => {
  const sql = 'SELECT codigo, nome, email FROM formulario';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao listar clientes:', err);
      res.status(500).send('Erro ao listar clientes.');
      return;
    }
    res.json(results); 
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});