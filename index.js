const express = require('express')
const app = express();
const port = process.env.PORT || 3000;

// mongodb
const { MongoClient } = require('mongodb');
const url = `mongodb://172.31.90.240:27017`;
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

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', './public');

app.get('/', (req, res) => {
  const portText = port.toString();
  const portChar = portText.charAt(portText.length - 1);

  const emojiPosition = parseInt(portChar);
  const emojiFigure = emojis[emojiPosition];

  res.render('index.pug', { message: `Escuchando en el puerto ${port} ${emojiFigure}` });
})

app.get('/database', async (req, res) => {
  try {
    await client.connect();
    return res.status(200).send("Conectado a la base de datos");
  } catch (error) {
    return res.status(200).send(error);
  }
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})