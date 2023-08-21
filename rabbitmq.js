const amqp = require('amqplib/callback_api');

function sendTask(task) {
  amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) throw error0;
    connection.createChannel(function(error1, channel) {
      if (error1) throw error1;
      const queue = 'taskQueue';
      channel.assertQueue(queue, { durable: false });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(task)));
    });
    setTimeout(function() {
      connection.close();
    }, 500);
  });
}

function processTasks() {
  amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) throw error0;
    connection.createChannel(function(error1, channel) {
      if (error1) throw error1;
      const queue = 'taskQueue';
      channel.assertQueue(queue, { durable: false });
      channel.consume(queue, function(msg) {
        const task = JSON.parse(msg.content.toString());
        // Logic to process the task
        console.log('Processed task:', task);
      }, {
        noAck: true
      });
    });
  });
}

module.exports = {
  sendTask,
  processTasks
};