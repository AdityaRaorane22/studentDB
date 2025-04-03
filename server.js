const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/studentDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Student = mongoose.model('Student', new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    grade: { type: String, required: true }
}));

app.get('/api/students', async (req, res) => res.json(await Student.find()));
app.get('/api/students/:id', async (req, res) => res.json(await Student.findById(req.params.id) || { message: 'Student not found' }));
app.post('/api/students', async (req, res) => res.status(201).json(await new Student(req.body).save()));
app.put('/api/students/:id', async (req, res) => res.json(await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }) || { message: 'Student not found' }));
app.delete('/api/students/:id', async (req, res) => res.json(await Student.findByIdAndDelete(req.params.id) ? { message: 'Deleted successfully' } : { message: 'Student not found' }));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
