const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/test', (_, res) => {
    res.json({ ok: true });
});

app.post('/pipedrive', (req, res) => {
    console.log('CHEGANDO DA API', req.body);

    res.json({ ok: true });
})

server.listen(process.env.PORT || port, function () {
    console.log(`🚀 Server running in ${port}\n`);
});