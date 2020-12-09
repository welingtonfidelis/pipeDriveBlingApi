const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema(
    {
        name: String
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
);

module.exports = mongoose.model('Test', TestSchema);