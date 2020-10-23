const express = require('express');
const router = express.Router();
const stripe = require('stripe');
const uuid = require('uuid');

router.post('/checkout', (req, res) => {
     const { products, token, sum } = req.body;
     console.log("Product : ", products);
     console.log("Product Price : ", sum);
     const idempontencyKey = uuid();

     return stripe.customers.create({
          email: token.email,
          source: token.id
     }).then(customer => {
          stripe.charges.create({
               amount: sum*100,
               currency: 'INR',
               customer: customer.id,
               receipt_email: token.email,
               description: product.name
          }, {idempontencyKey})
     }).then(result => res.status(200).json(result)).catch(err => { console.log(err) });
});

module.exports = router;