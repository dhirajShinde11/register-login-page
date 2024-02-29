var express = require('express');
var router = express.Router();
const userModel = require("./users");
const passport = require('passport');
const localstrategy = require("passport-local")
passport.use(new localstrategy(userModel.authenticate()))

router.get('/', function(req, res, ) {
  res.render('index.ejs');
});
router.get('/profile',isLoggedIn, function(req, res, ) {
  res.render('profile.ejs');
});

router.post('/register',function(req,res){
 const userdata = new userModel({
    username:req.body.username,
    secret:req.body.secret
  })

  userModel.register(userdata,req.body.password).then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect('/profile')
    })
  })
})
router.post('/login',passport.authenticate('local',{
  successRedirect:"/profile",
  failureRedirect:'/login'
}),function(req,res){})


router.get("/logout",function(req,res,next){
  req.logOut(function(err){
    if(err) return next(err)
    res.redirect("/")
  })
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/")
}

module.exports = router;
