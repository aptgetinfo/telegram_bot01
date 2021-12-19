const express = require('express');
const cors = require('cors');
const input = require("input");
const fetch = require('cross-fetch');
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const API_KEY = process.env.API_KEY;
const API_LINK = "https://api.telegram.org/" + API_KEY + "/getChatAdministrators?chat_id=@";
const API_ID = process.env.API_ID;
const API_HASH = process.env.API_HASH;
const STRING_SESSION = process.env.STRING_SESSION;
const PORT = process.env.PORT;


const app = express();
app.use(cors());
app.use(express.json());


const stringSession = new StringSession(STRING_SESSION);
const client = new TelegramClient(stringSession, API_ID, API_HASH, {
    connectionRetries: 5,
});


app.get('/', async (_, res) => {
    try {
        res.send('<h1>Telegram Mesenger : Online</h1>');
    } catch (e) {
        res.status(500).send();
    }
});


app.get('/getAdminOfGroup/:groupName', async (req, res) => {
    const array = [];
    const _id = req.params.groupName;
    if (!_id) {
        res.status(400).json({ failure: "Invalid Parameters" });
    }
    try {
        const Ress = await fetch(API_LINK + _id);
        if (!Ress.ok) {
            res.status(500).json({ failure: "Group Not Found" });
        }
        const json = await Ress.json();
        for (var i = 0; i < json.result.length; i++) {
            array.push(json.result[i].user.username);
        }
        res.status(200).send(array);
    } catch (e) {
        res.status(404).send(e);
    }
});

app.post('/msgAdminOfGroup/:groupName', async (req, res) => {
    const _id = req.params.groupName;
    const { message } = req.body;
    if (!_id || !message) {
        res.status(400).json({ failure: "Invalid Parameters" });
    }
    try {
        const Ress = await fetch(API_LINK + _id);
        if (!Ress.ok) {
            res.status(500).json({ failure: "Group Not Found" });
        }
        const json = await Ress.json();
        if (!client) {
            res.status(500).json({ failure: "Client not Found !" });
        }
        for (var i = 0; i < json.result.length; i++) {
            await client.sendMessage(`${json.result[i].user.username}`, { message: `${message}` });
        }
        res.status(200).json({ sucess: true });
    } catch (e) {
        res.status(404).send(e);
    }
});


const server = app.listen(PORT, () =>
    console.log(`Sever running on port ${PORT}`)
);
process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});