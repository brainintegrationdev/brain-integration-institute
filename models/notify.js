const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notifySchema = new Schema({
    timestamp: {
        type: String,
    },

    isAshAwesome: {
        type: String,
    },

    name: {
        type: String,
    },
});

const Notify = mongoose.model('Notify', notifySchema);

module.exports = Notify;
