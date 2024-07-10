const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/work-calendar', { useNewUrlParser: true, useUnifiedTopology: true });

const jobSchema = new mongoose.Schema({
    name: String,
    startTime: String,
    endTime: String,
    hourlyWage: Number,
    date: Date
});

const Job = mongoose.model('Job', jobSchema);

app.use(bodyParser.json());

app.post('/api/jobs', async (req, res) => {
    const job = new Job(req.body);
    await job.save();
    res.status(201).send(job);
});

app.get('/api/jobs', async (req, res) => {
    const jobs = await Job.find();
    res.status(200).send(jobs);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
