const express = require('express')
const app = express();
const port = process.env.PORT || 3000;

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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', './views');

app.get('/', (req, res) => {
  const portText = port.toString();
  const portChar = portText.charAt(portText.length - 1);

  const emojiPosition = parseInt(portChar);
  const emojiFigure = emojis[emojiPosition];
  
  res.render('index.pug', { message: `Escuchando en el puerto ${process.env.ENV_VAR} ${port} ${emojiFigure}`});
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})