require('dotenv').config();
const express = require("express")
const axios = require('axios');
const app = express()
const port = parseInt(process.env.PORT) || 3000
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const path = require('path');
let text;
let resp;
var grammarify = require("grammarify")

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
  const prefinal = await rewrite(text)
  const final = grammarify.clean(prefinal)
  res.send(final)
})

async function rewrite(text) {
  console.log("started!")
  

const options = {
  method: 'POST',
  url: 'https://api.spinbot.com/spin/rewrite-text',
  headers: {Origin: 'https://spinbot.com', 'Content-Type': 'application/json'},
  data: {
    text: text,
    x_spin_cap_words: false
  }
};

await axios.request(options).then(async function (response) {

  resp = response.data
}).catch(async function (error) {
  console.error(error);
});

  return resp

  
}

