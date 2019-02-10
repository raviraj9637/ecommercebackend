
const express = require('express');
const router = express.Router();
const passport = require('passport');

//load Product size Model
const Size = require('../../models/Size');


// @type   GET
// @route  /api/size
// @desc   route for getting all products size
// @access PUBLIC

router.get('/', (req, res) => {
    Size.find()
        .sort({ date : 'desc'})
        .then(products =>res.json(products))
        .catch(err => console.log(err))
});

// @type   POST
// @route  /api/size/
// @desc   route for submitting products size
// @access PRIVATE

router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
      const newSize = new Size({
          
          adult : req.body.adult,
          kid : req.body.kid
      });
      newSize
        .save()
        .then(product => res.json(product))
        .catch(err => console.error(err)) 
        // .catch(err => console.log('Unable to push product size')) 
    }  
);

module.exports = router;
