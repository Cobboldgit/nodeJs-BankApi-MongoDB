const BankModel = require("../models/bank");
const { validationResult } = require("express-validator");

const createBankController = (req, res) => {
  //validation checks
  const errors = validationResult(req);

  // check is empty
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.json({ message: errors.array()[0].msg });
  }

  const { name, phone ,location, branch, address, accountNumber } = req.body;
  const bank = new BankModel({
    name,
    phone,
    location,
    branch,
    address,
    accountNumber,
  });

  bank
    .save()
    .then((bank) => {
      res
        .status(200)
        .json({ message: "Bank created successfully", data: bank });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = createBankController;
