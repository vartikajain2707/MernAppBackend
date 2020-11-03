const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51H0PBdDthXXzKqsl0VeeWWGtycmhb2LFx7f5MddNGLnFAG7qua2oxqTVzkxHcA6SnGzg2TOy4tXxEcfUFFAYM2R000oCUoCbDL');

const calculateAmount = (items) => {
     console.log(items);
     let sum = 0;
     for (let i = 0; i < items.length; i++) {
          sum += items[i].amount*items[i].quantity;
     }
     return sum*100;
}
router.post("/create-payment-intent", async (req, res) => {
     const { items, name } = req.body;
     const customer = await stripe.customers.create({ name });
     const paymentIntent = await stripe.paymentIntents.create({
       customer: customer.id,
       setup_future_usage: "off_session",
       amount: calculateAmount(items),
       currency: "inr",
     });
     res.send({
       clientSecret: paymentIntent.client_secret
     });
});

module.exports = router;