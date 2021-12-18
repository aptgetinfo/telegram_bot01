const express = require('express');
const cors = require('cors');
const fetch =require('cross-fetch');
const app = express();
const API_KEY=process.env.API_KEY;
const BASE_URI="https://api.telegram.org/"+API_KEY+"/getChatAdministrators?chat_id=@";
app.use(cors());
app.use(express.json());
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
const PORT = process.env.PORT;
const server = app.listen(PORT, () =>
    console.log(`Sever running on port ${PORT}`)
);
process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});