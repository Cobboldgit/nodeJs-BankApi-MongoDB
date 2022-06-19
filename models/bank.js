const { Schema, model } = require("mongoose");

const BankSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  location: {
    required: true,
    type: String,
  },
  branch: {
    required: true,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
  accountNumber: {
    required: true,
    type: String,
  },
  accounts: [
    {
      accountId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Account",
      },
    },
  ],
});

const BankModel = model("Bank", BankSchema);

module.exports = BankModel;
