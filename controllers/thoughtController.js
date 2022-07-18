const { User, Thought } = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        console.log("req", req.params)
        Thought.findOne({ _id: req.params.thoughtId })
            .select('__v')
            .then((thought) =>{
            console.log("thought", thought);
                !thought
                    ? res.status(404).json({ message: "There is no Thought with that Id" })
                    : res.json(thought)
    })
            .catch((err) => {res.status(500).json(err);
            
            console.log("err", err)
    });
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: _id } },
                    { new: true },
                );
            })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No User found with that Id" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, New: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No thought found with that id" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought ? res.status(404).json({ message: "No thought found with that Id" })
                    : User.findByIdAndUpdate(
                        { thoughts: req.params.thoughttId },
                        { $pull: { thought: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "thought deleted but no User is found" })
                    : res.json({ message: "Thought deleted " })
            )
            .catch((err) => res.status(500).json(err));
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought ? res.status(404).json({ message: "No friend found with that iD" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
    deleteReaction(req, res) {
   
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with that Id" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};


