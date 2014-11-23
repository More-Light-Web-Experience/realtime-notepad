var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user').user;
mongoose.connect('mongodb://localhost/hello-world');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'index' });
});

/*login*/
router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});

/*logout*/
router.get('/logout', function(req, res) {
    res.render('logout', { title: 'logout' });
});

/*hompage*/
router.post('/homepage', function(req, res) {
    var query_doc = {name: req.body.name, password: req.body.password};
    (function(){
        user.count(query_doc, function(err, doc){
            if(doc == 0){
                console.log(query_doc.userid + ": login success in " + new Date());
                res.render('success' , {title : '登陆失败,请重试'  , back:'login'});
            }else{
                console.log(query_doc.userid + ": login failed in " + new Date());
                res.redirect('/user/list');
            }
        });
    })(query_doc);
});

module.exports = router;