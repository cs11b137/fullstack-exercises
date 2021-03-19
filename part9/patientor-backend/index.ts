import express from 'express';

const app = express();
const PORT = 3001;

app.get('/ping', (_req, res) => {
    res.send('<p>ping ok</p>');
});

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});