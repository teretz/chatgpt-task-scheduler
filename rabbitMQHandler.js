const amqp = require('amqplib/callback_api');

const RABBITMQ_URL = 'amqp://localhost';
let connection;
let channel;
const TASK_QUEUE = 'task_queue';

amqp.connect(RABBITMQ_URL, (error, conn) => {
  if (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    return;
  }
  connection = conn;
  conn.createChannel((error, ch) => {
    if (error) {
      console.error('Failed to create channel:', error);
      return;
    }
    channel = ch;
    console.log('Connected to RabbitMQ successfully.');
    channel.assertQueue(TASK_QUEUE, { durable: true });
  });
});

function postTask(task) {
  channel.sendToQueue(TASK_QUEUE, Buffer.from(JSON.stringify(task)), { persistent: true });
  console.log(`Posted task to queue: ${task.id}`);
}

function processTasks(callback) {
  channel.consume(TASK_QUEUE, (msg) => {
    const task = JSON.parse(msg.content.toString());
    callback(task);
    channel.ack(msg);
  }, { noAck: false });
}

module.exports = {
  connection,
  channel,
  postTask,
  processTasks
};