const mongoose = require('mongoose');

const TotalDealSchema = new mongoose.Schema(
    {
        value: Number,
        date: Date
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
);

module.exports = mongoose.model('TotalDealSchema', TotalDealSchema);