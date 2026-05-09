const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/practiceDB')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const TaskSchema = new mongoose.Schema({ name: String, status: String });
const Task = mongoose.model('Task', TaskSchema);

// API Routes
app.post('/tasks', async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).send(newTask);
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

// Health Check for Load Balancer/Blackbox
app.get('/health', (req, res) => res.status(200).send('OK'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
