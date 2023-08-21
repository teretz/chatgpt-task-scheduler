const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const { sendTask } = require('./rabbitmq');

const app = express();
app.use(bodyParser.json());

app.post('/task', (req, res) => {
  const task = req.body;
  task.dateCreated = new Date().toISOString();
  task.dateUpdated = task.dateCreated;

  // Save task to the database
  db.run(`INSERT INTO tasks (dateCreated, dateUpdated, title, projectTitle, taskTitle, queueOrder, isReadyToProcess, isNewTask, preProcessPrompt, postProcessPrompt, prompt, convoUrl, assembledMessage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [task.dateCreated, task.dateUpdated, task.title, task.projectTitle, task.taskTitle, task.queueOrder, task.isReadyToProcess, task.isNewTask, task.preProcessPrompt, task.postProcessPrompt, task.prompt, task.convoUrl, task.assembledMessage], (error) => {
    if (error) return res.status(500).send(error.message);

    // Send task to RabbitMQ queue
    sendTask(task);
    res.status(200).send('Task created');
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});