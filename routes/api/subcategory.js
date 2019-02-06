
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load Product SubCategory Model
const ProductSubCategory = require('../../models/Subcategory');


// @type   GET
// @route  /api/productsubcategory
// @desc   route for getting all products sub category
// @access PUBLIC

router.get('/', (req, res) => {
    ProductSubCategory.find()
        .sort({ date : 'desc'})
        .then(products =>res.json(products))
        .catch(err => console.log(err))
});

// @type   POST
// @route  /api/productsubcategory/
// @desc   route for submitting products sub category
// @access PRIVATE

router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
      const newProductSubCategory = new ProductSubCategory({
          
          subCategory : req.body.subCategory
         
      });
      newProductSubCategory
        .save()
        .then(product => res.json(product))
        // .catch(err => console.error(err)) 
        .catch(err => console.log('Unable to push product')) 
    }  
)

module.exports = router;















