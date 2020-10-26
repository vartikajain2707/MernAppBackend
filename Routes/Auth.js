const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("../Keys");

router.post('/signup', (req, res) => {
     const { name, email, password, mobileNumber } = req.body;
     if(!email || !password || !name || !mobileNumber) {
          return res.status(422).json({ error: "Please fill all the fields" });
     }
     User.findOne({ email: email })
     .then((savedUser) => {
          if (savedUser) {
               return res.status(422).json({ error: "User already exists" });
          }
          bcrypt.hash(password, 15)
          .then(hashedPassword => {
               const user = new User({
                    email,
                    password: hashedPassword,
                    name,
                    mobileNumber
               });
     
               user.save()
               .then(user => {
                    res.json({ message: "Saved Successfully!" });
               })
               .catch(err => {
                    console.log(err);
               });
          });
     })
     .catch(err => {
          console.log(err);
     });
});

router.post('/signin', (req, res) => {
     const { email, password } = req.body;
     if (!email || !password) {
          return res.status(422).json({ error: "Please fill all entries!" });
     }
     User.findOne({ email })
     .then(savedUser => {
          if (!savedUser) {
               return res.status(422).json({ error: "Invalid Username or Password" });
          }
          bcrypt.compare(password, savedUser.password)
          .then(doesMatch => {
               if (doesMatch) {
                    const token = jwt.sign({ _id: savedUser._id }, JWTSECRET);
                    res.json({ token });
               } else {
                    return res.status(422).json({ error: "Invalid Username or Password" });
               }
          })
          .catch(err => {
               console.log(err);
          });
     });
});

module.exports = router;