const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./Develop/db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();
// Navigate here in your browser to test the server: http://localhost:3001
// This allows us to input CSS and Javascript files with index.html
app.use(express.static('public'));
// This allows us to parse incoming string/array data
app.use(express.urlencoded({ extended: true }));
// This allows us to parse incoming JSON data
app.use(express.json());


// This route reads ALL data coming from db.json
app.get('/api/notes', (req, res) => {
    fs.readFile('./Develop/db/db.json', 'utf8', function(err, data) {
        res.send(data)
    }); 
});
// This route reads individual notes that are singularly pulled from db.json
app.get('/api/notes', (req, res) => {
    res.send('./Develop/db/db.json', 'utf8', function())
})
// This route allows user to create notes in db.json
app.post('/api/notes', (req, res) => {
    fs.writeFile(`./Develop/db/db.json`, JSON.stringify(newNotes), (err) => err)
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

