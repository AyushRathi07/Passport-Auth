var User = require('../models/user');
var bcrypt = require('bcrypt');
var passport = require('passport');

exports.get_signup = function(req, res, next){
  res.render('signup',{title: 'Sign Up'});
}

exports.post_signup = function(req,res,next){
    const {username, password} = req.body;
    User.findOne({username}).exec((err, user) => {
      if(err){
        return next(err);
      }
      if(user){
        const err = new Error("User already registered!");
        err.status(400);
        next(err);
      }
      const hash = bcrypt.hashSync(password, 10);
      const _user = new User({
        username,
        hash_password: hash
      });
      _user.save(function(err){
        if(err) next(err);
        passport.authenticate("local")(req, res, function(){
          res.redirect('/blogs');
        })
      })
        
    })
}

exports.get_signin = function(req, res, next){
  res.render('signin',{title: 'Sign In'});
}

exports.post_signin = function(req, res, next){

}

exports.get_become_admin = function(req, res, next){
  res.render('become-admin', {title: 'Become An Admin'});
}

exports.post_become_admin = function(req, res, next){
  if(!req.isAuthenticated()) res.redirect('/users/signin');
  if(req.body.password === process.env.admin_password){
    const {_id} = req.user;
    User.findByIdAndUpdate(_id, {role: 'admin'})
      .then((user) => {
        req.login(user, (err) => next(err));
      })
      .catch(err => next(err));
  } else {
    res.render('become-admin',{title: 'Become An Admin', message: 'Incorrect passcode!'});
  }
  res.redirect('/');
};

exports.get_become_member = function(req, res, next){
  res.render('become-member', {title: 'Become A Member'})
}

exports.post_become_member = function(req, res, next){
  if(!req.isAuthenticated()) res.redirect('/users/signin');
  if(req.body.password === process.env.member_password){
    const {_id} = req.user;
    User.findByIdAndUpdate(_id, {role: 'member'})
      .then((user) => {
        req.login(user, (err) => next(err));
      })
      .catch(err => next(err));
  } else {
    res.render('become-member',{title: 'Become A Member', message: 'Incorrect passcode!'});
  }
  res.redirect('/');
};

exports.get_wrong_credentials = function(req, res, next){
  res.render('signin',{title: 'Sign in', message: 'Incorrect Username or Password'});
}

exports.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated())
      next();
  else
      res.redirect('/users/signin');
}

exports.verifyAdmin = function(req, res, next){
  if(req.isAuthenticated()){
      const user = req.user;
      if(user.role === 'admin')
          next();
      else
          res.redirect('/users/become_admin');
  }
}

exports.verifyMember = function(req, res, next){
  if(req.isAuthenticated()){
      const user = req.user;
      if(user.role === 'member' || user.role === 'admin')
          next();
      else
          res.redirect('/users/become_member');
  }
}

exports.get_logout = function(req, res, next){
  req.logout();
  res.redirect('/blogs');
}