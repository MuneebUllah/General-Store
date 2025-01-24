const mongoose = require('mongoose')

const creditSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    paidAmount:{
        type:Number,
        default:0
    },
    remainingAmount:{
        type:Number,
        default:0,
    },
    phone:Number,
    description:String
}, { timestamps: true } )

const payCreditAmountSchema = new mongoose.Schema({
    creditId: { type: mongoose.Schema.Types.ObjectId, ref: 'creditModal', required: true },
    description: { type: String },
    paidAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    totalAmount:{type:Number , default: 0},
    remainingAmount:{type:Number , default: 0},
});

const creditModal = mongoose.model('Credit' , creditSchema)
const payCreditAmountModal = mongoose.model('Pay Credit Amount' , payCreditAmountSchema)

module.exports = { creditModal , payCreditAmountModal };