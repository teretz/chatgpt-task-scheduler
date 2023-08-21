const taskProcessor = require('./taskProcessor');
const Task = require('./database');

const taskController = {
  createTask: function(req, res) {
    const taskData = req.body;
    taskProcessor.processNewTask(taskData).then(task => res.status(201).json(task)).catch(err => res.status(500).json({ error: err.message }));
  },

  getTask: function(req, res) {
    const taskId = req.params.id;
    Task.findById(taskId).then(task => res.json(task)).catch(err => res.status(404).json({ error: 'Task not found' }));
  },

  updateTask: function(req, res) {
    const taskId = req.params.id;
    const updateData = req.body;
    taskProcessor.updateTask(taskId, updateData).then(task => res.json(task)).catch(err => res.status(500).json({ error: err.message }));
  },

  deleteTask: function(req, res) {
    const taskId = req.params.id;
    taskProcessor.deleteTask(taskId).then(() => res.status(204).end()).catch(err => res.status(500).json({ error: err.message }));
  }
};

module.exports = taskController;