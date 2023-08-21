const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tasks.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dateCreated TEXT,
    dateUpdated TEXT,
    title TEXT,
    projectTitle TEXT,
    taskTitle TEXT,
    queueOrder INTEGER,
    isReadyToProcess INTEGER,
    isNewTask INTEGER,
    preProcessPrompt TEXT,
    postProcessPrompt TEXT,
    prompt TEXT,
    convoUrl TEXT,
    assembledMessage TEXT
  )`);
});

module.exports = db;