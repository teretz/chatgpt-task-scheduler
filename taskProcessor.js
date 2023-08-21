const Task = require('./database');
const taskScheduler = require('./taskScheduler');

const taskProcessor = {
  processNewTask: function(taskData) {
    const newTask = new Task(taskData);
    return newTask.save();
  },

  updateTask: function(taskId, updateData) {
    return Task.findByIdAndUpdate(taskId, updateData, { new: true });
  },

  deleteTask: function(taskId) {
    return Task.findByIdAndDelete(taskId);
  }
};

module.exports = taskProcessor;