// use miniproject as guide

const {connect,connection} = require('mongoose');

const connectionString = 
process.env.MONGODB_URL || 'mongodb://localhost:27017/socialDB';
connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;

