const {Schema, Types } = require('mongoose');
const moment = require ('moment');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeNow => moment(timeNow).format('MMMM Do YYYY, h:mm:ss a'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

const reactionSchema = newSchema(
    {
        // use assignment from miniproject
        reactionId: {
            type: Schema.Types.ObjectId(),
            default: () => newTypes.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username : {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeNow => moment(timeNow).format('MMMM Do YYYY, h:mm:ss a'),
        },
    },
   {
     toJSON: {
        virtuals: true,
        getters:true,
     },
     id: false,
    }
)

thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})
const Thought = model('Thought', thoughtSchema)
module.exports = Thought;
