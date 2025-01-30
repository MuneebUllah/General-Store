const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentDate: { type: Date, default: Date.now },
    amount: { type: Number },
    description:String
});

const billSchema = new mongoose.Schema({
    billName: { type: String, required: true },
    invoiceNumber: { type: String, unique: true, required: true },
    totalAmount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    payments: [paymentSchema]
}, { timestamps: true });

billSchema.virtual('remainingAmount').get(function() {
    return this.totalAmount - this.paidAmount;
});

billSchema.set('toJSON', { virtuals: true });
billSchema.set('toObject', { virtuals: true });

// Bill History Schema (Completed Bills)
const billHistorySchema = new mongoose.Schema({
    billName: String,
    invoiceNumber: String,
    totalAmount: Number,
    paidAmount: Number,
    payments: [paymentSchema],
    completedAt: { type: Date, default: Date.now }  // When bill was fully paid
}, { timestamps: true });

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    bills: [billSchema],  // Active bills
    billHistory: [billHistorySchema],  // Completed bills history
    createdAt: { type: Date, default: Date.now }
});

// Middleware to move fully paid bills to history
companySchema.pre('save', function(next) {
    const company = this;

    // Filter bills where remainingAmount is 0
    const completedBills = company.bills.filter(bill => bill.totalAmount === bill.paidAmount);

    if (completedBills.length > 0) {
        // Move completed bills to history
        company.billHistory.push(...completedBills);
        // Remove them from active bills
        company.bills = company.bills.filter(bill => bill.totalAmount !== bill.paidAmount);
    }

    next();
});

const cashSchema = mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
    type: { type: String, required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

const savingSchema = mongoose.Schema({
    amount: Number,
    date: { type: Date, default: Date.now }
}, { timestamps: true });

const billModal = mongoose.model('Bill', companySchema);
const billHistoryModal = mongoose.model('BillHistory', billHistorySchema);
const savingModal = mongoose.model('Saving', savingSchema);
const cashModal = mongoose.model('Cash', cashSchema);

module.exports = { billModal, billHistoryModal, savingModal, cashModal };
