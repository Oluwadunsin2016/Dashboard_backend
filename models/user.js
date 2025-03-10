const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    personal_information: {
      fullName: { type: String, default: null },
      dob: { type: String, default: null },
      homeAddress: { type: String, default: null },
      contact: { type: String, default: null },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    },
    business_information: {
      business_sector: { type: String, default: null },
      business_email: { type: String, default: null },
      business_whatsapp: { type: String, default: null },
      business_address: { type: String, default: null },
      business_closest_bstop: { type: String, default: null },
    },
    work_information: {
      work_email: { type: String, default: null },
      work_phone_number: { type: String, default: null },
      office_address: { type: String, default: null },
      office_bstop: { type: String, default: null },
    },
    identity_verification: {
      identity: { type: String, default: null },
      bvn: { type: String, default: null },
      utility: { type: String, default: null },
    },
    account_information: {
      bank: { type: String, default: null },
      account_number: { type: String, default: null },
      card_number: { type: String, default: null },
      payment_app: { type: String, default: null },
    },
  });
  
  module.exports = model('User', userSchema);