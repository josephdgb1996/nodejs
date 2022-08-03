const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

// mongodb
const { MongoClient } = require('mongodb');
const url = `mongodb://44.202.135.119:27017,3.93.82.62:27017,3.87.54.8:27017/?replicaSet=rs0`;
// const url = `mongodb://172.31.90.240:27017`;
const client = new MongoClient(url);


const emojis = {
  0: "🤠",
  1: "🤪",
  2: "😵‍💫",
  3: "🙃",
  4: "😎",
  5: "😏",
  6: "👺",
  7: "🫠",
  8: "🥸",
  9: "😏",
}


app.use(cors())
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', './public');

app.get('/', async (req, res)  => {
  const portText = port.toString();
  const portChar = portText.charAt(portText.length - 1);

  const emojiPosition = parseInt(portChar);
  const emojiFigure = emojis[emojiPosition];

  let status = "Conectando..."

  try {
    await client.connect();
    status = "Conectado";
  } catch (error) {
    status = "Desconectado";
  }

  res.render('index.pug', { message: `Escuchando en el puerto ${port} ${emojiFigure}`, status: status });
})

app.get('/database', async (req, res) => {
  try {
    client = await (await client.connect());
    console.log(client.db.name);
    return res.status(200).send("Conectado a la base de datos");
  } catch (error) {
    return res.status(200).send(error);
  }
})

app.get('/message', (req, res) => {
  const portText = port.toString();
  const portChar = portText.charAt(portText.length - 1);

  const emojiPosition = parseInt(portChar);
  const emojiFigure = emojis[emojiPosition];
  res.status(200).send({ message: `Escuchando en el puerto ${port} ${emojiFigure}` })
})

app.get('/status', async (req, res) => {
  try {
    await client.connect();
    return res.status(200).send({ status: true });
  } catch (error) {
    return res.status(404).send({ status: false });
  }
})


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})