const express = require("express");
const { body } = require("express-validator");
const listBanksController = require("../controllers/listBanksController");
const updateBankController = require("../controllers/updateBankController");
const deleteBankController = require("../controllers/deleteBankController");
const createBankController = require("../controllers/createBankController");
const BankModel = require("../models/bank");

const router = express.Router();

// View banks - get method
router.get("/banks/:id?", listBanksController);

// create banks - post method
router.post(
  "/banks/",
  [
    body("name").trim().not().isEmpty().withMessage('Name cannot be empty'),
    body("location").trim().not().isEmpty().withMessage('Location cannot be empty'),
    body("branch").trim().not().isEmpty().withMessage('Branch cannot be empty'),
    body("phone")
      .isMobilePhone("en-GH")
      .custom((value, { req }) => {
        return BankModel.findOne({ phone: value }).then((bankDoc) => {
          if (bankDoc) {
            return Promise.reject("Phone number already taken");
          }
        });
      }),
  ],
  createBankController
);

// update banks - put method
router.put("/banks/:id", updateBankController);

// delete banks - delete method
router.delete("/banks/", deleteBankController);

module.exports = router;
