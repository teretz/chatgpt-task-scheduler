const { postTask, processTasks } = require('./rabbitMQHandler');

function handleNewConvo(task) {
  // Logic to handle new conversation
}

function handleExistingConvo(task) {
  // Logic to handle existing conversation
}

function mainLoop() {
  processTasks((task) => {
    if (task.isNewTask) {
      handleNewConvo(task);
    } else {
      handleExistingConvo(task);
    }
  });
}

mainLoop();