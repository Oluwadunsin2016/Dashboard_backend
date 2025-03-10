const { default: mongoose } = require("mongoose");

const investmentSchema = new mongoose.Schema({
    productName: String,
    amountPerUnit: Number,
    rate: { type: Number, default: null },
    period: { type: String, default: null },
    pictures: [{ type: String, ref: 'File', default: null}], 
    videos: [{ type: String, ref: 'File',default: null}], 
  });
  module.exports = mongoose.model('Investment', investmentSchema);