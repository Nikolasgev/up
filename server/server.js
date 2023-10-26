const express = require('express');
const app = express();
const cors = require('cors'); 
const fs = require('fs');
const path = require('path');

app.use(cors());

app.get('/download/:word', (req, res) => {
    const word = req.params.word;
    const filePath = path.join(__dirname, 'words', `${word}`);
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Length': stat.size
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
});


const keywordLists = {
    'спорт': ['http://sport1.ru', 'http://sport2.ru', 'http://sport3.ru',],
    'машины': ['http://car1.ru', 'http://car2.ru', 'http://car3.ru'],
};

app.get('/keywords/:keyword', (req, res) => {
    const keyword = req.params.keyword;
    const words = keywordLists[keyword] || [];
    res.json(words);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
