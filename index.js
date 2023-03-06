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
let time;




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
  const posttext = pretext.replace(/(\r\n|\n|\r)/gm, "");
  text = posttext
  const preeverfinal = await rewrite(text)
  res.send(preeverfinal)

})


app.get('/test', async function (req, res) {

  const preeverfinal = await rewrite("Human behavior is an incredibly complex and multifaceted subject that has been studied by scholars across a range of disciplines for centuries. It is the actions, reactions, and responses that people exhibit in different situations and is shaped by various factors, including genetics, culture, environment, and individual experiences. This essay will examine some of the key aspects of human behavior, including its underlying causes, how it is shaped by social and cultural factors, and the impact it has on individuals and society as a whole. At its core, human behavior is driven by a complex interplay of biological and environmental factors. On the one hand, genetics play a significant role in shaping our behavior, influencing everything from our personality traits to our susceptibility to certain mental health conditions. For example, research has shown that genetic factors account for around 40-60% of the variability in personality traits such as extraversion and openness to experience (Plomin, DeFries, & Loehlin, 1977). Similarly, studies have identified specific genes associated with mental health conditions such as depression, anxiety, and schizophrenia (Sullivan et al., 2019). However, genetics alone cannot explain the full range of human behavior. Environmental factors such as upbringing, culture, and social norms also play a significant role in shaping our behavior. For example, studies have shown that children who grow up in abusive or neglectful households are more likely to exhibit behavioral problems later in life (Cicchetti & Toth, 2005). Similarly, cultural norms and values can influence everything from how people express their emotions to their attitudes towards authority and hierarchy (Triandis, 1995). One of the most interesting aspects of human behavior is how it is shaped by social and cultural factors. Social psychology, in particular, has focused on understanding how people's behavior is influenced by their interactions with others. One of the key theories in this field is social learning theory, which proposes that people learn by observing and imitating others (Bandura, 1977). This theory helps explain how behaviors such as smoking, drug use, and aggression can be transmitted through social networks and cultural norms. However, it is important to note that social and cultural factors can also have a positive impact on human behavior. For example, research has shown that social support and positive social interactions can promote mental health and well-being (Cohen & Wills, 1985). Similarly, cultural values such as collectivism and social responsibility can promote pro-social behavior and cooperation (Hofstede, 1980). Human behavior can have a profound impact on both individuals and society as a whole. For example, behaviors such as drug addiction, violence, and crime can have devastating consequences for individuals and their families. At the same time, collective behaviors such as voting, protesting, and volunteering can have a positive impact on society by promoting social change and advancing the common good. In conclusion, human behavior is a complex and multifaceted subject that is shaped by a range of biological, environmental, social, and cultural factors. While genetics play a significant role in shaping our behavior, it is important to recognize that social and cultural factors also have a significant impact. By understanding the underlying causes of human behavior, we can better understand how to promote positive behaviors and reduce negative ones, ultimately improving the lives of individuals and society as a whole. ")
    const final = preeverfinal
    res.send(final)
    console.log(final)

})

app.get("/favicon.ico", async function (req, res) {
  res.sendFile(path.join(__dirname, `/views/favicon.ico`));
})

app.get("/logo.png", async function (req, res) {
  res.sendFile(path.join(__dirname, `/views/logo.png`));
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
const start = Date.now()
await axios.request(options).then(async function (response) {
  const finish = Date.now()
  resp = response.data
  time = (finish - start) / 1000 + "s"
  
}).catch(async function (error) {
  console.error(error);
});

  return {"text": resp, "time": time}

  
}

