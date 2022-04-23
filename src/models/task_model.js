const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/taskManager-api', {
    useNewUrlParser: true,
    // useCreateIndex: true
});

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }, owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});


const Tasks = mongoose.model('Tasks', taskSchema)
module.exports = Tasks;