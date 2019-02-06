
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load Product Type Model
const ProductType = require('../../models/Producttype');


// @type   GET
// @route  /api/producttype
// @desc   route for getting all products types
// @access PUBLIC

router.get('/', (req, res) => {
    ProductType.find()
        .sort({ date : 'desc'})
        .then(products =>res.json(products))
        .catch(err => console.log(err))
});

// @type   POST
// @route  /api/producttype/
// @desc   route for submitting products type
// @access PRIVATE

router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
      const newProductType = new ProductType({
          productType : req.body.productType
      });
      newProductType
        .save()
        .then(product => res.json(product))
        // .catch(err => console.error(err)) 
        .catch(err => console.log('Unable to push product')) 
    }  
);

module.exports = router;






