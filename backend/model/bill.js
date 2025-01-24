const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paidAmount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const cashSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true,
        default:0,
    },
    type:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const savingSchema = mongoose.Schema({
    amount: Number,
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });


// Virtual for calculating remaining amount
billSchema.virtual('remainingAmount').get(function() {
    return this.totalAmount - this.paidAmount;
});

// Ensure virtual fields are included in JSON output
billSchema.set('toJSON', { virtuals: true });
billSchema.set('toObject', { virtuals: true });

const billModal = mongoose.model('Bill', billSchema);
const savingModal = mongoose.model('Saving' , savingSchema);
const cashModal = mongoose.model('Cash' , cashSchema)

module.exports = {billModal , savingModal , cashModal};
