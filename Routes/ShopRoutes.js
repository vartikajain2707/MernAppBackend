const router = require('express').Router();
const Shop = require('../Models/ShopModel');
const { route } = require('./Auth');

router.route('/getShops').get((req, res) => {
     Shop.find()
          .then(shops => {
               res.json(shops);
          })
          .catch(err => {
               console.log(err);
          });
});

router.route('/getShopName').post((req, res) => {
     const { id } = req.body;
     Shop.findById(id)
          .then(shopName => {
               res.json(shopName);
          })
          .catch(err => {
               console.log(err);
          });
});

router.route('/createShop').post((req, res) => {
     const {name, photoURL, shopType, description} = req.body;
     if (!name || !shopType || !photoURL || !description) {
          return res.status(422)
                    .json({ "error": "Title and Body Required!" });
     }
     const shop = new Shop({
          name,
          photoURL,
          shopType,
          description,
     });
     shop.save().then(result => {
          res.json({ shop: result });
     })
     .catch(err => {
          console.log(err);
     });
});

router.route('/search').post((req,res) => {
     let shopPattern = new RegExp("^" + req.body.query);
     Shop.find( { name: { $regex: shopPattern } } )
          .then(shops => {
               res.json(shops);
          })
          .catch(err => {
               console.log(err);
          });
});

module.exports = router;