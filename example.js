const mongoose = require('mongoose');
const { Schema } = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/test')
  .then(data => console.log(`Connection OK`))
  .catch(err => console.log(`err`, err));

const taskSchema = new Schema({
  value: String,
  user_id: mongoose.ObjectId,
});

const Task = mongoose.model('tasks', taskSchema);
(async () => {
  //find
  const foundTasks = await Task.find().limit(2);
  console.log(`foundTasks`, foundTasks);

  //create
  const newTask = {
    value: 'Relax',
    user_id: mongoose.Types.ObjectId('61b88f7bec088610152ffe1e'),
  };
  const newTaskInstance = new Task(newTask);
  const createdTask = await newTaskInstance.save();
  console.log(`createdTask`, createdTask);

  //findById
  const taskId = '61b8cacabc9ad3c43fdb69ba';
  const foundTask = await Task.findById(taskId);
  console.log(`foundTask`, foundTask);

  //updateById
  const updateForTask = { value: 'Relax' };
  const updateTask = await Task.findByIdAndUpdate(taskId, updateForTask);
  console.log(`updateTask`, updateTask);

  //deleteById
  const deletedTask = await Task.findByIdAndDelete(taskId);
  console.log(`deletedTask`, deletedTask);
})();
