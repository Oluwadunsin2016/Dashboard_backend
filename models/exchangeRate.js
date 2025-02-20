const mongoose = require('mongoose');

const ExchangeRateSchema = new mongoose.Schema({
  fromCountry: {
    name: { type: String, required: true },
    code: { type: String, required: true },
    emoji: { type: String, required: true },
    unicode: { type: String, required: true },
    currency_code: { type: String, required: true },
    image: { type: String, required: true }
  },
  toCountry: {
    name: { type: String, required: true },
    code: { type: String, required: true },
    emoji: { type: String, required: true },
    unicode: { type: String, required: true },
    currency_code: { type: String, required: true },
    image: { type: String, required: true }
  },
  rate: { type: Number, required: true }
});

module.exports = mongoose.model('exchange_rates', ExchangeRateSchema);