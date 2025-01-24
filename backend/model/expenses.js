const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description:String
} , { timestamps: true })

const expenseModal = mongoose.model('Expense', expenseSchema)

module.exports = expenseModal;