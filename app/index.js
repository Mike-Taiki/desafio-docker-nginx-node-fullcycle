const express = require('express');
const app = express();
const PORT = 3000;
const mysql = require('mysql');
const geradorNome = require('gerador-nome')

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const connection = mysql.createConnection(config);

app.get("/", (req, res) => {
  const name = geradorNome.geradorNome();
  connection.query(`CREATE TABLE if not exists people (nome VARCHAR(100))`);
  connection.query(`INSERT INTO people(nome) values('${name}')`);
  
  connection.query(`SELECT nome FROM people`, (error, result, fields) => {
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ul>
        ${result.map(el =>`<li>${el.nome.replace(',', '')}</li>`).join('')}
      </ul>
    `)
  })
});

app.listen(PORT, () => {
  console.log('listening on PORT', PORT);
});