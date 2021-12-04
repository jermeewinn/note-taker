const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./Develop/db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();
// Navigate here in your browser to test the server: http://localhost:3001/api/animals
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});