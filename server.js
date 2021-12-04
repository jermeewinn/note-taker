const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./Develop/db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();
// Navigate here in your browser to test the server: http://localhost:3001
app.get('/', (req, res) => {
    fs.readFile('./Develop/db/db.json', 'utf8', function(err, data) {
        res.send(data)
    }); 
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

// fs.readFile('./Develop/db/db.json', 'utf8', function(err, data) {
//     console.log(data)
// });
//