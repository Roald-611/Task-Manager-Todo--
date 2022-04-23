const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth')
const Tasks = require('../models/task_model');

router.post("/tasks", auth, async (req, res) => {
    // const tasks = new Tasks(req.body);
    // tasks.save().then(() => {
    //     res.status(201).send(tasks);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // });
    const tasks = new Tasks({
        ...req.body,
        owner: req.user._id
    })
    try {
        await tasks.save()
        res.status(201).send(tasks)
    } catch (error) {
        res.status(400).send(error)
    }
});


//GET /tasks?completed=true//filtering
//GET/tasks?limit=10&skip=20(for 3'rd page we skips them)//pagging
//GET/tasks?sortBy=createdAt:asc(//desc)
router.get("/tasks", auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        // const tasks = await Tasks.find();
        // const tasks = await Tasks.find({ owner: req.user._id })
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                // sort: {
                //     // createdAt: -1
                //     // completed: 1//(then first there is false then trues)
                // }
                sort
            },
        });
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send();
    }
    // Tasks.find({}).then((tasks) => {
    //     res.send(tasks);
    // }).catch((e) => {
    //     res.status(500).send();
    // })
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    // Tasks.findById(_id).then((tasks) => {
    //     if (!tasks) {
    //         return res.status(404).send();
    //     }
    //     res.send(tasks);
    // }).catch((e) => {
    //     res.status(500).send();
    // })
    try {
        // const tasks = await Tasks.findById(_id);
        const tasks = await Tasks.findOne({ _id, owner: req.user._id })
        if (!tasks) {
            return res.status(404).send();
        }
        res.send(tasks);
    } catch (error) {
        res.status(500).send();
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid Updates" });
    }

    try {

        // const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        const task = await Tasks.findOne({ _id: req.params.id, owner: req.user._id })
        // const task = await Tasks.findById(req.params.id);

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        if (!task) {
            return res.status(404).send();
        }
        res.send(task)
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Tasks.findByIdAndDelete(req.params.id);
        const task = await Tasks.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        // await req.user.remove();

        if (!task) {
            return res.status(404).send();

        }
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
})

module.exports = router