var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var note = require('../models/note').note;
mongoose.connect('mongodb://localhost/realtime_notepad');

/* notepad index.html. */
router.get('/', function(req, res) {
    note.find(function(err,docs){
        res.render('index', {
            title : 'note list',
            note_list : docs
        });
    });
});


/* addNote */
router.post('/addNote', function(req, res) {
    // 增加记录 基于model操作
    var doc = {
        type: '1',
        content: req.body.content,
        created_at: Date.now(),
        updated_at: Date.now()
    };
    note.create(doc, function(error){
        if(error) {
            console.log(error);
            res.send(JSON.stringify({err : 1,message : error}));
        } else {
            console.log('save ok');
            res.send(JSON.stringify({err : 0}));
        }
    });
});

/* editNote */
router.post('/editNote', function(req, res) {
    var id = req.body.id;
    var doc = {
        type: '1',
        content: req.body.content,
        created_at: Date.now(),
        updated_at: Date.now()
    };

    console.log(id);
    console.log(doc);

    var conditions = {_id : id};
    var update     = {$set : doc};
    var options    = {upsert : true};
    if(id && '' != id) {
        note.update(conditions, update, options, function(error){
            if(error) {
                console.log(error);
                res.send(JSON.stringify({err : 1,message : error}));
            } else {
                console.log('update ok!');
                res.send(JSON.stringify({err : 0}));
            }
        });
    }
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