const express = require("express");
const User = require("../models/User");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");

const router = express.Router(); //Multiple requests can be easily differentiated with the help of the Router() function in Express

router.post(
  "/createuser",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email address"),

    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);  //generate salt 
    const hashedPassword = await bcrypt.hash(req.body.password , salt);  //generate hashed password

    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });
      await user.save();
      //If user created succesffuly response of success true is send
      res.json({
        success: true
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false
      });
    }
  }
);

module.exports = router;
