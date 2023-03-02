require('dotenv').config();
const express = require("express")
var FormData = require('form-data');
const axios = require('axios');
var form = new FormData();
const app = express()
const port = parseInt(process.env.PORT) || 3000
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const path = require('path');
let text;

app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded
app.get('/style.css', async function(req, res){
  res.sendFile(path.join(__dirname, `/views/style.css`));
})

app.get('/script.js', async function(req, res){
  res.sendFile(path.join(__dirname, `/views/script.js`));
})

app.get('/', async function (req, res) {
  res.sendFile(path.join(__dirname, `/views/index.html`));
})

app.post('/s', async function(req, res){
  const pretext = req.body.text
  const posttext = pretext.replace(/(\r\n|\n|\r)/gm, "");
  text = posttext
  res.redirect(302, '/rewrite');

  


});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(upload.array());
app.use(express.static('public'));

app.get("/rewrite", async (req, res) => {
  const final = await rewrite(text)
  res.send(final)
})

async function rewrite(text) {
  console.log("started!")
  form.append('data', text.toString())
  const response = await axios.post(
    'https://spinbot.info/php/process.php',
    form,
    {
      headers: {
        ...form.getHeaders(),
        'content-type': 'multipart/form-data'
      }
    }
  );
  return response.data
}

