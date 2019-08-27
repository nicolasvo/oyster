const express = require('express');
const Editor = require('./editor');
const bodyParser = require('body-parser');

const editor = new Editor();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(3000, () => {
  console.log('Server listening on 3000.');
});

app.get("/", (req, res) => {
  editor.get().then(
    result => res.status(200).send({data: result})
  ).catch(
    console.error
  );
});

app.post("/append", (req, res) => {
  console.time('boi');
  const word = req.body.word;
  const from_lang = req.body.from_lang;
  editor.append(word, from_lang).then(
    res.sendStatus(200)
  );
  console.timeEnd('boi');
});

app.post("/update", (req, res) => {
  console.time('bae');
  const data = req.body.data;
  editor.update(data).then(
    res.sendStatus(200)
  );
  console.timeEnd('bae');
});

app.post("/remove", (req, res) => {
  console.time('bye');
  const rows = req.body.rows;
  editor.remove(rows).then(
    res.sendStatus(200)
  );
  console.timeEnd('bye');
});

app.get("/languages", (req, res) => {
  editor.getColumns().then(
    result => res.status(200).send({data: result})
  ).catch(
    console.error
  );
});