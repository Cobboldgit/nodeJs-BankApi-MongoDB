const accountModel = require("../models/account");

const listAccountController = (req, res) => {
  const { id } = req.params;
  if (id) {
    accountModel
    .findById(id)
      .populate("bankId", "name location branch")
      .then((account) => {
        res.status(200).json({
          message: "Account retrieved successfully",
          data: account,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    accountModel
      .find()
      .populate("bankId", "name location branch")
      .then((accounts) => {
        res.status(200).json({
          message: "Accounts retrieved successfully",
          data: accounts,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

module.exports = listAccountController;
