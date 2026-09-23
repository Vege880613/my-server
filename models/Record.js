const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    type: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Record', RecordSchema);