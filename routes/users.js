const express = require('express');
const router = express.Router();
const passport = require('passport');
const {post_signup, get_become_admin, get_wrong_credentials, post_become_admin, get_signup, get_signin, post_signin, get_become_member, post_become_member, isLoggedIn, get_logout} = require('../controllers/auth');

router.get('/signup', get_signup);

router.post('/signup', post_signup);

router.get('/signin', get_signin);

router.post('/signin',
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/wrong_credentials"
  }), post_signin
);

router.get('/wrong_credentials', get_wrong_credentials);

router.get('/become_admin', isLoggedIn, get_become_admin);

router.post('/become_admin', isLoggedIn, post_become_admin);

router.get('/become_member', isLoggedIn, get_become_member);

router.post('/become_member', isLoggedIn, post_become_member);

router.get('/logout', isLoggedIn, get_logout);

module.exports = router;
