const express = require('express');
const app = express();
const port = 3000;
const { handleLogin, processTasks, initiateNewConvo } = require('./main.js');
const { sendTask, processTasks: processRabbitTasks } = require('./rabbitmq.js');

app.get('/', (req, res) => {
  res.send('Kaguya Task Scheduler is running!');
});

app.post('/postTask', (req, res) => {
  const task = req.body;
  sendTask(task);
  res.send('Task posted successfully!');
});

app.get('/processTasks', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await handleLogin(page);
  await processTasks(page);
  await browser.close();
  res.send('Tasks processed successfully!');
});

app.listen(port, () => {
  console.log(`Kaguya Task Scheduler listening at http://localhost:${port}`);
});

module.exports = app;