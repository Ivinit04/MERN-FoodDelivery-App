const express = require("express");
const User = require("../models/User");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router(); //Multiple requests can be easily differentiated with the help of the Router() function in Express
const jwtSecret = "ThisIsnotMySeCret@";

router.post(
  "/loginuser",
  [
    
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

    const {email , password} = req.body;

    try {
      const userData = await User.findOne({email});
      if(!userData){
        return res.status(400).json({ errors: errors.array() });
      }

      const validPassword = await bcrypt.compare(password , userData.password);
 
      if(!validPassword){
        return res.status(400).json({ errors: "Password is incorrect" });
      }

      const user = {
        id: userData.id
      }

      const authToken = jwt.sign(user , jwtSecret);
      
      res.json({
        success: true,
        authToken: authToken
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
