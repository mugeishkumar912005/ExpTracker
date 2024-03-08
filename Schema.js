const M = require('mongoose');

const ModelE = new M.Schema({
    // Define your schema fields here
    amount: Number,
    catagory: String,
    Date: Date
});

module.exports = { ModelE };
