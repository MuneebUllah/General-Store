const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    size: String,
    purchasePrice: {
      type: Number,
      required: true,
    },
    salePrice:{
      type:Number,
      required:true,
    },
    noOfItems: {
      type: Number,
      default:1,
    },
    weight: String,
    totalAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

// const historyLogSchema = new mongoose.Schema({
//     action: { type: String, required: true }, // e.g., "add", "subtract"
//     name: { type: String, required: true },
//     category: { type: String, required: true },
//     size: { type: String },
//     weight: { type: String},
//     quantity: { type: Number, required: true },
//     previousQuantity: { type: Number, required: true },
//     newQuantity: { type: Number, required: true },
//     timestamp: { type: Date, default: Date.now }
// });

// Pre-save hook to calculate totalAmount before saving
schema.pre('save', function(next) {
  // Calculate totalAmount before saving to DB
  this.totalAmount = this.quantity * this.noOfItems * this.price;
  
  next(); // Proceed to save
});

const shopModal = mongoose.model('Stop', schema);
// const HistoryLog = mongoose.model('HistoryLog', historyLogSchema);


module.exports = { shopModal };
