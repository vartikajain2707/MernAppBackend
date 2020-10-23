const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const stripe = require('stripe')('sk_test_51H0PBdDthXXzKqsl0VeeWWGtycmhb2LFx7f5MddNGLnFAG7qua2oxqTVzkxHcA6SnGzg2TOy4tXxEcfUFFAYM2R000oCUoCbDL');
const { MONGODBURI } = require('./keys');

app.use(cors());
app.use(express.json());
app.use(require('./Routes/ItemRoutes'));
app.use(require('./Routes/ShopRoutes'));
app.use(require('./Routes/Auth'));
app.use(require('./Routes/PaymentRoutes'));

mongoose.connect(MONGODBURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
     console.log('MONGO DB Connected Successfully!');
});


app.listen(PORT, () => {
     console.log(`Server Stated at ${ PORT }`);
});