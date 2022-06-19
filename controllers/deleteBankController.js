const accountModel = require("../models/account");
const BankModel = require("../models/bank");

const deleteBankController = (req, res) => {
  const { id } = req.body;
  BankModel.findByIdAndRemove(id).then((bank) => {
    if (bank) {
      accountModel
        .deleteMany({
          bankId: bank._id,
        })
        .then(() => {
          res.json({ message: "Bank deleted successfully", data: bank });
        })
        .catch((err) => {
          console.log(err);
        });
    } else res.status(404).json({ message: "Bank not found" });
  });
};

module.exports = deleteBankController;
