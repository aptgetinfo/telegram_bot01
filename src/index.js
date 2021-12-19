const express = require('express');
const cors = require('cors');
const input = require("input");
const fetch =require('cross-fetch');
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const app = express();
const API_KEY=process.env.API_KEY;
const BASE_URI="https://api.telegram.org/"+API_KEY+"/getChatAdministrators?chat_id=@";
const apiId = process.env.API_ID;
const apiHash = process.env.API_HASH;


app.use(cors());
app.use(express.json());

const stringSession = new StringSession(process.env.STRING_SESSION); 



app.get('/', async (_, res) => {
    try {
        res.send('<h1>EventListnerOne:Online</h1>');
    } catch (e) {
        res.status(500).send();
    }
});
app.get('/getAdminOfGroup/:groupName', async (req,res)=>{
    const array=[];
   const _id = req.params.groupName;
    if (!_id) {
        res.status(400);
    }
    try {
    const Ress = await fetch(BASE_URI + _id);
    if (!Ress.ok) {
        res.status(500);
    }
    const json = await Ress.json();
    for(var i =0; i<json.result.length;i++){
        array.push(json.result[i].user.username);
    }
        res.status(201).send(array);
    } catch (e) {
        res.status(404).send(e);
    }
});

app.get('/msgAdminOfGroup/:groupName', async (req,res)=>{
    const array=[];
   const _id = req.params.groupName;
    if (!_id) {
        res.status(400);
    }
    try {
    const Ress = await fetch(BASE_URI + _id);
    if (!Ress.ok) {
        res.status(500);
    }
    const json = await Ress.json();
    (async () => {
        const client = new TelegramClient(stringSession, apiId, apiHash, {
          connectionRetries: 5,
        });
        await client.start({
          phoneNumber: async () => await input.text("Please enter your number: "),
          password: async () => await input.text("Please enter your password: "),
          phoneCode: async () =>
            await input.text("Please enter the code you received: "),
          onError: (err) => console.log(err),
        });
        console.log(client.session.save());
        for(var i =0; i<json.result.length;i++){
            await client.sendMessage(`${json.result[i].user.username}`, { message: "Hello!" });
        }
      })();
    
    } catch (e) {
        res.status(404).send(e);
    }
});


const PORT = process.env.PORT;
const server = app.listen(PORT, () =>
    console.log(`Sever running on port ${PORT}`)
);
process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});
