const express = require('express');
const fs = require('fs');
const path = require('path');
// add db connection
const db = require('./db/db.json');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static('assets'));
app.use(express.json());

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/notes.html'))
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
});

app.get('/api/notes', function(req, res){
    res.json(db);
}
);
// redo code here: make it work using different method.

app.post('/api/notes', (req,res) => {
    fs.readFile('./db/db.json', 'utgf8', (err, data)=>{
        if (err) throw err;
        var notes =JSON.parse(data);
        let userNote= req.body;
        userNote.id = Math.floor(Math.random()* 5000);
        notes.push(userNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes),(err, data) =>{
            res.json(userNote);
        });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data)=>{
        if (err) throw err; 
        let notes =JSON.parse(data);
        const newNotes = notes.filter(note => note.is !== parseInt(req.params.id));
        
        fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err,data) => {
            res.json({msg:'sucess'});
        });
    });
});

app.get('api/notes/:id', (req,res) =>{
    res.json(notes[req.params.id]);
});

app.listen(PORT, () => {
    console.log(`app listening on PORT: ${PORT}`)
});
// clean up code 
// fix code to function