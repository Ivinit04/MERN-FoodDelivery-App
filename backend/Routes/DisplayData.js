const express = require("express");
const router = express.Router(); 

router.post("/food" , (req, res)=>{
    try {
        res.send([global.foodItems , global.foodCategories]);  
      } catch (error) {
        console.log(error);
        res.send("Items cannot be send");
      }
})

module.exports = router;