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




app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded
app.get('/style.css', async function(req, res){
  res.sendFile(path.join(__dirname, `/views/style.css`));
})



app.get('/', async function (req, res) {
  res.sendFile(path.join(__dirname, `/views/index.html`));
})

app.get('/about', async function (req, res) {
  res.sendFile(path.join(__dirname, `/views/about.html`));
})

app.post('/api', async function (req, res) {

  const pretext = req.body.text
  const posttext = pretext.replaceAll(/(\r\n|\n|\r)/gm, "");
  text = posttext
  const preeverfinal = await rewrite(text)
  const final = preeverfinal.replaceAll(/(\r\n|\n|\r)/gm, "");
  res.send(final)


})





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(upload.array());
app.use(express.static('public'));


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

