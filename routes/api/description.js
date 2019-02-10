
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load Product Description Category Model
const Description = require('../../models/Category');


// @type   GET
// @route  /api/description
// @desc   route for getting all products description
// @access PUBLIC

router.get('/', (req, res) => {
    Description.find()
        .sort({ date : 'desc'})
        .then(products =>res.json(products))
        .catch(err => console.log(err))
});

// @type   POST
// @route  /api/description/
// @desc   route for submitting products description
// @access PRIVATE

router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
      const newDescription = new Description({
          
          description : req.body.description
      });
      newDescription
        .save()
        .then(product => res.json(product))
        .catch(err => console.error(err)) 
        // .catch(err => console.log('Unable to push product description')) 
    }  
);



module.exports = router;















