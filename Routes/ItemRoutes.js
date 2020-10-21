const router = require('express').Router();
const mongoose = require('mongoose');
const Item = require('../Models/ItemModel');

router.route('/getItems').get((req, res) => {
     Item.find()
          .populate('atShop','_id name')
          .then(items => {
               res.json({ items });
          })
          .catch(err => {
               console.log(err);
          });
});

router.route('/:shopId/items').get((req, res) => {
     Item.find({ atShop: req.params.shopId })
          .populate("atShop","_id name")
          .then(shopItems => {
               res.json({ shopItems });
          })
          .catch(err => {
               console.log(err);
          });
});

router.route('/:shopId/createItem').post((req, res) => {
     const { name, photoURL, price, description, availability } = req.body;
     if (!name || !price || !photoURL) {
          return res.status(422)
                    .json({ "error": "Title and Body Required!" });
     }
     const item = new Item({
          name,
          photoURL,
          price,
          description,
          availability,
          atShop: req.params.shopId,
     });
     item.save().then(result => {
          res.json({ item: result });
     })
     .catch(err => {
          console.log(err);
     });
});

module.exports = router;