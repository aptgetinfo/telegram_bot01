const express = require('express');
const cors = require('cors');
const fetch =require('cross-fetch');
const app = express();
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
    console.log(req.params.groupName);
   const _id = req.params.groupName;
    if (!_id) {
        res.status(400);
    }
    try {
    const Ress = await fetch(BASE_URI + _id);
    if (!Ress.ok) {
        res.status(500);
    }
    console.log(Ress);
    const json = await Ress.json();
        res.status(201).send(json.result);
    } catch (e) {
        res.status(404).send(e);
    }
});
const PORT = process.env.PORT||3000;
const server = app.listen(PORT, () =>
    console.log(`Sever running on port ${PORT}`);
);
process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});