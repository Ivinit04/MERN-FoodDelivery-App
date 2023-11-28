const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
const port = 5000;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin , X-Requested-Width , Content-Type , Accept"
  );
  next();
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

const uri =
  "mongodb+srv://vinitjoshiofficial:Vinit_joshi04@cluster0.sp0xlhb.mongodb.net/goFoodMERN?retryWrites=true&w=majority";

mongoose.connect(uri);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  // The MongoDB connection is open, you can now access the collection
  const foodItemsCollection = db.collection("food_items");

  // Find all documents in the collection
  foodItemsCollection
    .find({})
    .toArray()
    .then((data) => {
        // console.log("Data inside 'food_items' collection:", data);
      global.foodItems = data;
    })
    .catch((err) => {
      console.error("Error fetching data from 'food_items' collection:", err);
    });

    const foodCategoriesCollection = db.collection("food_categories");

    foodCategoriesCollection.find({}).toArray().then(categoryData => {
      // console.log(categoryData);
      global.foodCategories = categoryData;
    }).catch(err => {
      console.error("Error fetching data from 'food_categories' collection:", err);
    })
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/LoginUser"));
app.use("/api", require("./Routes/DisplayData"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
