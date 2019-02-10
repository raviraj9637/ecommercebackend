
const express = require('express');
const router = express.Router();
const passport = require('passport');

//load Product Model
const Color = require('../../models/Color');


// @type   GET
// @route  /api/color
// @desc   route for getting all products color
// @access PUBLIC

router.get('/', (req, res) => {
    Color.find()
        .sort({ date : 'desc'})
        .then(products =>res.json(products))
        .catch(err => console.log(err))
});

// @type   POST
// @route  /api/color/
// @desc   route for submitting products color
// @access PRIVATE

router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
      const newColor = new Product({color : req.body.color});
      newColor
        .save()
        .then(product => res.json(product))
        .catch(err => console.error(err)) 
        // .catch(err => console.log('Unable to push product color')) 
    }  
);

module.exports = router;















