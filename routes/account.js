const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const createAccountController = require("../controllers/createAccountController");
const listAccountController = require("../controllers/listAccountController");
const account = require("../models/account");
const BankModel = require("../models/bank");

const accountValidation = [
  body("name").trim().not().isEmpty().withMessage("Name is required"),
  body("accountType")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Account type is required"),
  body("phone")
    .isMobilePhone("en-GH")
    .custom((value, { req }) => {
      return account.findOne().then((accountDoc) => {
        if (accountDoc) {
          return Promise.reject("Phone number already taken");
        }
      });
    }),
  body("accountNumber")
    .isNumeric()
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 12, max: 12 })
    .custom((value, { req }) => {
      return account.findOne({ accountNumber: value }).then((accountDoc) => {
        if (accountDoc) {
          return Promise.reject("Account number already exist");
        }
      });
    }),
  body("bankId")
    .trim()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      return BankModel.findById(value).then((bank) => {
        if (!bank) {
          return Promise.reject("Invalid bank");
        }
      });
    }),
];

// create account
router.post("/accounts", accountValidation, createAccountController);

// retrieve account
router.get("/accounts/:id?", listAccountController);

module.exports = router;
