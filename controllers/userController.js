
const {User,Thought} = require('../models');

const userController = {
    getUser(req,res) {
        User.find()
        .then((user) => res.json(user))
        .catch((err) => res.json(err))
    },
    getSingleUser(req,res) {
        User.findOne({_id: req.params.userId })
        .then((user) =>
        !user
        ? res.status(404).json({message: 'No user with that Id'})
        :res.json( user))
        .catch((err) => res.status(500).json(err))
    },

    createUser(req,res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    },
    updateUser(req,res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((user)=>
        !user
        ?res.status(404).json({message: "No User found with this Id"})
        : res.json(user)    
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req,res) {
        User.findOneAndDelete({ _id: req.params.userId})
        .then((user) => 
        !user
        ? res.status(404).json({message: "No user with that Id"})
        : Thought.deleteMany({ _id: { $in: user.thoughts}})
        )
        .then(()=> res.json({message: 'Both User and Thought deleted'}))
        .catch((err) => res.status(500).json(err));
    },
    addFriend(req,res) {
        User.findOneAndUpdate(
        { _id: req.params.userId},
        {$addToSet: {friends: req.params.friendId}},
        {runValidators: true, new:true }        
        )
        .then((user) =>
        !user
        ?res.status(404).json({message: "No User found with this Id"})
        :res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req,res) {
        User.findOneAndUpdate(
            { _id:req.params.userId},
            { $pull: {friends:req.params.friendId}},
            {new: true}
        )
        .then((user) =>
        !user
        ? res.status(404).json({message: "No User found with this Id"})
        : res.json(user)    
        )
        .catch((err) => res.status(500).json(err));
    },

};

module.exports = userController