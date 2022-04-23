const mongodb = require('mongodb');

const taskSchema = new mongodb.Schema({
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


const Tasks = mongodb.model('Tasks', taskSchema)
module.exports = Tasks;