
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');
//bring all routes
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const product = require('./routes/api/product');
const category = require('./routes/api/category');
const subcategory = require('./routes/api/subcategory');
const brand = require('./routes/api/brand');
const producttype = require('./routes/api/producttype');
const productcode = require('./routes/api/productcode');
const color = require('./routes/api/color');
const size = require('./routes/api/size');
const description = require('./routes/api/description');


const app = express();

//middleware fore body-parser
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

//mongoDB configuration
const db = require('./setup/myurl').mongoURL

//attemp to connect to database

mongoose
    .connect(db)
    .then(() => console.log("mongoDB connected successfully"))
    .catch( err => console.log(err)
    )


var port = process.env.PORT || 3000;
var hostname = "127.0.0.1";

//just for testing route
app.get('/', (req, res) => {
    res.send("This is testing");
});

//passport middileware
app.use(passport.initialize());

//config for JWT strategy
require('./strategies/jsonwtStrategy')(passport);


//auctual routes
app.use('/api/auth', auth);
app.use('/api/size', size);
app.use('/api/color', color); 
app.use('/api/brand', brand);
app.use('/api/profile', profile);
app.use('/api/product', product);
app.use('/api/category', category);
app.use('/api/subcategory', subcategory);
app.use('/api/productcode', productcode);
app.use('/api/producttype', producttype);
app.use('/api/description', description);




app.listen(port, hostname, () => {
    console.log(`server is running at http://${hostname}:${port}`);
});