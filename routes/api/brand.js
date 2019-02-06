
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load Product Brand Model
const ProductBrand = require('../../models/Brand');

// @type   GET
// @route  /api/product
// @desc   route for getting all products
// @access PUBLIC

router.get('/', (req, res) => {
    ProductBrand.find()
        .sort({ date : 'desc'})
        .then(products =>res.json(products))
        .catch(err => console.log(err))
});

// @type   POST
// @route  /api/product/
// @desc   route for submitting products
// @access PRIVATE

router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
      const newProductBrand = new ProductBrand({
          brandName : req.body.brandName
      });
      newProductBrand
        .save()
        .then(productBrand => res.json(productBrand))
        // .catch(err => console.error(err)) 
        .catch(err => console.log('Unable to push product')) 
    }  
);

// @type   POST
// @route  /api/product/img/:id
// @desc   route for images of products
// @access PRIVATE

// router.post(
//     "/img/:id",
//     passport.authenticate("jwt", {session: false}),
//     (req, res) => {
//         Product.findById(req.params.id)
//             .then( product => {
//                 const newImg = {
//                     user: req.user.id,
//                     // name: req.body.name,
//                     img: req.body.img
//                 };
//                 product.img.unshift(newImg);
//                 product.save()
//                     .then(product => res.json(product))
//                     .catch(err => console.log(err))
//             })
//             .catch(err => console.log(err))
//     }
// )


module.exports = router;















