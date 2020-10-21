const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const { MONGODBURI } = require('./keys');

app.use(cors());
app.use(express.json());
app.use(require('./Routes/Auth'));

mongoose.connect(MONGODBURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
     console.log('MONGO DB Connected Successfully!');
});

app.use(express.json());
app.use(require('./Routes/ItemRoutes'));
app.use(require('./Routes/ShopRoutes'));

app.listen(PORT, () => {
     console.log(`Server Stated at ${ PORT }`);
});