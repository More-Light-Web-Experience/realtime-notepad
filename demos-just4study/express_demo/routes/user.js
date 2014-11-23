var express = require('express');
var router = express.Router();

var user = require('../models/user').user;

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/* list */
router.get('/list', function(req, res) {
    user.find(function(err,docs){
        res.render('user/list', {
            title : '用户列表',
            user_list : docs
        });
    });
});

/* addUser */
router.get('/add', function(req, res) {
    res.render('user/add', { title: '添加用户' });
});

/* addUserDo */
router.post('/addSave', function(req, res) {
    // 增加记录 基于model操作
    var doc = {name: req.body.name, password: req.body.password , age : req.body.age , des : req.body.des};
    user.create(doc, function(error){
        if(error) {
            console.log(error);
        } else {
            console.log('save ok');
            res.render('success' , {title : '添加成功，欢迎' + doc.name});
        }
        res.render('success' , {title : '登陆失败,请重试'});
    });
});

/* editUser */
router.get('/edit', function(req, res) {
    var id = req.query.id;
    console.log(id);
    user.findById(id,function(err,docs){
        res.render('user/edit', {
            title : '修改用户',
            user : docs
        });
    });
});

/* editSave */
router.post('/editSave', function(req, res) {
    var doc = {name: req.body.name, password: req.body.password , age : req.body.age , des : req.body.des};
    console.log(doc)
    var id = req.body.id;
    // 修改记录
    var conditions = {_id : id};
    var update     = {$set : doc};
    var options    = {upsert : true};
    user.update(conditions, update, options, function(error){
        if(error) {
            console.log(error);
            res.render('success' , {title : '登陆失败,请重试'});
        } else {
            console.log('update ok!');
            res.render('success' , {title : '修改成功，欢迎' + doc.name});
        }
    });
});

/* editUserDo */
router.post('/editSave2', function(req, res) {
    var id = req.body.id;
    console.log(id);
    var doc = {name: req.body.name, password: req.body.password , age : req.body.age , des : req.body.des};
    console.log(doc);
    if(id && '' != id) {
        user.findByIdAndUpdate(id, doc , function(err, docs) {
            if(error) {
                console.log(error);
            res.render('success' , {title : '登陆失败,请重试'});
            } else {
                console.log('update ok!');
            res.render('success' , {title : '修改成功，欢迎' + doc.name});
            }
        });
    }
});

/* detail */
router.get('/detail', function(req, res) {
    var id = req.query.id;
    console.log(id);
    user.findById(id,function(err,docs){
        res.render('user/detail', {
            title : '用户详情',
            user : docs
        });
    });
});

/* delUser */
router.get('/delete', function(req, res) {
    // 根据id删除相应的记录
    var id = req.query.id;
    console.log(id);
    if(id && '' != id) {
        console.log('----delete id = ' + id);
        user.findByIdAndRemove(id, function(err, docs) {
            console.log('delete-----'+ docs);
            res.redirect('/user/list');
        });
    }
});

/* editUserDo */
router.post('/editUserDoBak', function(req, res) {
    var doc = {name: req.body.name, password: req.body.password , age : req.body.age , des : req.body.des};
    // 修改记录
    var conditions = {name : doc.name};
    var update     = {$set : {password : doc.password}};
    var options    = {upsert : true};
    user.update(conditions, update, options, function(error){
        if(error) {
            console.log(error);
            res.render('success' , {title : '登陆失败,请重试'});
        } else {
            console.log('update ok!');
            res.render('success' , {title : '修改成功，欢迎' + doc.name});
        }
    });
});



module.exports = router;
