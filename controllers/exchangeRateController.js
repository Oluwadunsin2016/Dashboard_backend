const exchange_rates = require('../models/exchangeRate');
exports.setRate=async (req, res) => {
  const { fromCountry, toCountry, rate } = req.body;
  try {
    let exchangeRate = await exchange_rates.findOne({
      'fromCountry.code': fromCountry.code,
      'toCountry.code': toCountry.code
    });
    if (exchangeRate) {
      exchangeRate.rate = rate;
    } else {
      exchangeRate = new exchange_rates({ fromCountry, toCountry, rate });
    }
    await exchangeRate.save();
    res.status(200).json(exchangeRate);
  } catch (error) {
    res.status(500).json({ error: 'Error setting exchange rate' });
  }
}

exports.getRate=async (req, res) => {
    const { fromCountryCode, toCountryCode } = req.query;
    try {
      const exchangeRate = await exchange_rates.findOne({
        'fromCountry.code': fromCountryCode,
        'toCountry.code': toCountryCode
      });
      if (exchangeRate) {
        res.status(200).json(exchangeRate);
      } else {
        res.status(404).json({ error: 'Exchange rate not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching exchange rate' });
    }
  }