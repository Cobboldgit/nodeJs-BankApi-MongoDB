const accountModel = require("../models/account");
const BankModel = require("../models/bank");
const {validationResult} = require('express-validator')

const createAccountController = (req, res) => {
  // validation checks
  const errors = validationResult(req)

  // check conditions
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.json({message: errors.array()[0].msg})
  }
  // body request
  const { name, phone ,accountNumber, accountType, bankId } = req.body;
  
  BankModel.findById(bankId)
        .populate("accounts")
        .where("phone")
        .equals(phone)
        .exec((d) => {
          console.log(d);
        })
  // const account = new accountModel({
  //   name,
  //   phone,
  //   accountNumber,
  //   accountType,
  //   bankId,
  // });

  // BankModel.findById(bankId).then((bank) => {
  //   if (bank) {
  //     account
  //       .save()
  //       .then((result) => {
  //         if (result) {
  //           res.status(200).json({
  //             message: "Account Created",
  //             data: result,
  //           });
  //         } else {
  //           res.status(500).json({
  //             message: "Failed to created create account",
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     res.status(404).json({
  //       message: "Bank not found",
  //     });
  //   }
  // });
  console.log('yeah');
};

module.exports = createAccountController;
