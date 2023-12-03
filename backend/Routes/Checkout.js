const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51OImAWSDZJxlcAG1AKI7v6zLVs8DXOdhzESamrE5ABckOECoonFLzrrZDiuS3JaGvg7MjOuNVvQXk6qkZ5mzpx0600x0XnezVZ"
);

router.post("/checkout", async (req, res) => {
//   console.log(req.body);
  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.name,
      },
      unit_amount: product.price /product.qty *100,
    },
    quantity: product.qty,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url:"http://localhost:3000",
    cancel_url:"http://localhost:3000"
  });

  res.json({ id: session.id });
});

module.exports = router;
