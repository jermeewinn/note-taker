const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./Develop/db/db.json');
const uuid = require('./helpers/uuid');
const PORT = process.env.PORT || 3001;
const app = express();
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
// Navigate here in your browser to test the server: http://localhost:3001
// This allows us to input CSS and Javascript files with index.html
app.use(express.static('Develop/public'));
// This allows us to parse incoming string/array data
app.use(express.urlencoded({ extended: true }));
// This allows us to parse incoming JSON data
app.use(express.json());


// This route allows us to load in the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});
// This route allows us to load in our notes collected from db.json.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});
// This route allows us to load in our notes from db.json
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/db/db.json'));
});

// This route reads ALL data coming from db.json
app.get('/api/notes', (req, res) => {
    const data = fs.readFileSync('./Develop/db/db.json', 'utf8')
        res.send(data);
        console.log(data);
});


// This route allows user to create notes in db.json
app.post('/api/notes', (req, res) => {
    console.info(`${req.body} request received to add a note`);
    const { title,text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        console.log(newNote)
        readFileAsync('./Develop/db/db.json', 'utf8')
        .then((notes) => {
            console.log("read file", notes)
            const parsedNotes = JSON.parse(notes);
            parsedNotes.push(newNote);
            writeFileAsync('./Develop/db/db.json', JSON.stringify(parsedNotes))
            .then((updatedNote) => {
                console.log("updated note", updatedNote);
                res.json(parsedNotes);
            })
        });
    } else {
        res.json('Error in creating new note');
    }     
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    console.log("deleting note with ID", noteId);
    readFileAsync('./Develop/db/db.json', 'utf8')
        .then((notes) => {
            notes = JSON.parse(notes)
            console.log(notes);
            for (let i = 0; i < notes.length; i++) {
                const note = notes[i];
                console.log("current note", note);
                if(noteId == note.id) {
                    notes.splice(i, 1);
                    console.log("fixed notes", notes)
                    writeFileAsync('./Develop/db/db.json', JSON.stringify(notes))
                    .then((updatedNote) => {
                    console.log("updated note", updatedNote);
                    res.json(notes);
                    })
                }                
            } 
        })
});

// This route is more for everything else. Seeing that index.html only acts as a landing page, this will apply here.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

