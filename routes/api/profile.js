
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Person Model
const Person = require("../../models/Person");

//load profile Model
const Profile = require("../../models/Profile");

// @type   GET
// @route  /api/profile
// @desc   route for personal user profile
// @access PRIVATE

router.get(
    '/',
    passport.authenticate('jwt', {session : false}),
    (req, res) => {
        Profile.findOne({ user: req.user.id})
            .then( profile => {
                if(!profile) {
                    return res.status(404).json({profilenotfound:'No profile found'})
                }
                res.json(profile);
            })
            .catch(err => console.log('got some error in profile' +err))
    }
)

// @type   POST
// @route  /api/profile
// @desc   route for UPDATE/SAVING personal user profile
// @access PRIVATE

router.post(
    '/',
    passport.authenticate('jwt', {session : false}),
    (req, res) => {
        const profileValues = {};
        profileValues.user = req.user.id;
        if(req.body.username) profileValues.username = req.body.username;
        if(req.body.website) profileValues.website = req.body.website;
        if(req.body.country) profileValues.country = req.body.country;
        if(req.body.portfolio) profileValues.portfolio = req.body.portfolio;
        // if(req.body.languages) profileValues.languages = req.body.languages;
        if (typeof req.body.languages !== undefined) {
            profileValues.languages = req.body.languages.split(",");
        }
        //get social values
        profileValues.social = {};
        if(req.body.youtube) profileValues.social.youtube = req.body.youtube;
        if(req.body.facebook) profileValues.social.facebook = req.body.facebook;
        if(req.body.instagram) profileValues.social.instagram = req.body.instagram;

        Profile.findOne({ user:req.user.id})
            .then(profile => {
                if(profile){
                    Profile.findOneAndUpdate(
                        { user: req.user.id},
                        { $set: profileValues},
                        { new : true}
                    )
                        .then(profile => res.json(profile))
                        .catch(err => console.log("problem in update "+ err))
                } else {
                    Profile.findOne({username: profileValues.username})
                        .then(profile => {
                            if(profile) {
                                res.status(400).json({username : "Username is already exist"})
                            }
                            //save user
                            new Profile(profileValues)
                                .save()
                                .then( profile => res.json(profile))
                                .catch( err => console.log("Problem in username"+err))
                        })
                        .catch(err => console.log("Username is not available"+err))
                }
            })
            .catch( err => console.log('Problem in Fetching Profile' +err))

    });



// @type   GET
// @route  /api/profile/:username
// @desc   route for getting user profile based on USERNAME
// @access PUBLIC


router.get('/:username', (req, res) => {
    Profile.findOne({username: req.params.username})
        .populate('user', ['name','profilepic'])
        .then(profile => {
            if(!profile) {
                res.status(404).json({usernotfound : 'User not found'})
            }
            res.json(profile);
        })
        .catch(err => console.log("Error in fetching in username "+err))
})

// @type   GET
// @route  /api/profile/:id
// @desc   route for getting user profile based on ID
// @access PUBLIC

router.get('/find/everyone', (req, res) => {
    Profile.find()
        .populate('user', ['name', 'profilepic'])
        .then(profiles =>{
            if(!profiles) {
                res.status(404).json({useridnotfound : 'No profile found'})
            }
            res.json(profiles)
        })
        .catch(err => console.log("Error in fetching id"+err))
});


// @type   DELETE
// @route  /api/profile/
// @desc   route for deleting user profile 
// @access PUBLIC

router.delete(
    '/',
    passport.authenticate('jwt', {session : false}),
    (req, res) => {
        Profile.findOne( {user: req.user.id});
        Profile.findOneAndRemove({ user : req.user.id})
            .then( () => {
                Person.findOneAndRemove({_id:req.user.id})
                .then( () => res.json({success : 'delete was success'}))
                .catch(err => console.log(err))
            })
            .catch(err => console.log("Problem in Deleting profile"+err))
})

// @type   POST
// @route  /api/profile/workrole
// @desc   route for adding work profile of person
// @access PRIVATE

router.post('/workrole', passport.authenticate('jwt', {session:false}), (req, res) => {
    Profile.findOne({user : req.user.id})
    .then( profile => {
        //assignment
        if(!profile) {
            res.status(404).json({workroleerror : 'error in workrole'})
        }
        const newWork = {
            role : req.body.role,
            company : req.body.company,
            country : req.body.country,
            from : req.body.from,
            to : req.body.to,
            current : req.body.current,
            details : req.body.details
        };
        profile.workrole.unshift(newWork);
        profile
            .save()
            .then( profile => res.json(profile))
            .catch(err => console.log(err))
    })
    .catch(err => console.log("Error in workrole "+err))
})


// @type   DELETE
// @route  /api/profile/workrole/:w_id
// @desc   route for deleting a specific workrole 
// @access PRIVATE

router.delete(
    '/workrole/:w_id',
    passport.authenticate('jwt', {session : false}),
    (req, res) => {
        // Profile.findOne( {user: req.user.id});
        Profile.findOne({ user : req.user.id})
            .then( profile => {
                if(!profile) {
                    res.status(404).json({ workroledeleteerror : 'error in deleting workrole'})
                }
                const removethis = profile.workrole
                    .map(item => item.id)
                    .indexOf(req.params.w_id)

                    profile.workrole.splice(removethis,1);
                    profile
                        .save()
                        .then( profile => res.json(profile))
                        .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
);


















module.exports = router;






































