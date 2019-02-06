
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load Product Category Model
const ProductCategory = require('../../models/Category');


// @type   GET
// @route  /api/productcategory
// @desc   route for getting all products category
// @access PUBLIC

router.get('/', (req, res) => {
    ProductCategory.find()
        .sort({ date : 'desc'})
        .then(products =>res.json(products))
        .catch(err => console.log(err))
});

// @type   POST
// @route  /api/productcategory/
// @desc   route for submitting products category
// @access PRIVATE

router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
      const newProductCategory = new ProductCategory({
          
          category : req.body.category
      });
      newProductCategory
        .save()
        .then(product => res.json(product))
        .catch(err => console.error(err)) 
        // .catch(err => console.log('Unable to push product')) 
    }  
);



module.exports = router;















