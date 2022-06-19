const BankModel = require("../models/bank");

const updateBankController = (req, res) => {
  const {id, name, location, branch, phone, address, accountNumber } = req.body;
    
  BankModel.findById(id).then((bank) => {
    if (bank) {
      bank[0].name = name;
      bank[0].location = location;
      bank[0].branch = branch;
      bank[0].phone = phone;
      bank[0].address = address;
      bank[0].accountNumber = accountNumber;

      bank[0].save().then((bank) => {
        res.status(200).json({ message: "Bank updated successfully", data: bank });
      });
    } else {
      res.status(404).json({ message: "Bank not found" });
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

module.exports = updateBankController;