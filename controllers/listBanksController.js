const BankModel = require("../models/bank");

const listBanksController = (req, res) => {
    const {id} = req.params
 if (!id) {
    BankModel.find()
    .then((banks) => {
      res.status(200).json({ message: "successful", data: banks });
    })
    .catch((err) => {
      console.log(err);
    });
 } else {
     BankModel.findById(id).then((bank) => {
         if (bank) {
            res.status(200).json({ message: "successful", data: bank });
         } else {
            res.status(404).json({ message: "Bank not found" });
         }
     })
 }
};

module.exports = listBanksController;
