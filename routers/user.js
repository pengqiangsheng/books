var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var User = require('../models/user')
var bodyParser = require('body-parser')
var _ = require('underscore')


router.use(bodyParser())//postbodyParser

//signup
router.post('/signup', function(req, res) {
  console.log('signup')

  var _user = req.body.user

  User.findOne({name: _user.name}, function(err, user) {
    if(err) {
      console.log(err)
    }
    if(user) {
      console.log('用户名重复')
      res.redirect('/user/list')
    }else {
      var user = new User(_user)
      user.save(function(err, user) {
        console.log('save ...')
        if(err) {
          console.log(err)
        }
        res.redirect('/user/list')
      })
    }
  }) 
})

//signin
router.post('/signin', function(req, res) {
  console.log('signin')
  var _user = req.body.user
  var name = _user.name
  var pwd = _user.pwd
  User.findOne({name: name}, function(err, user) {
    if (err) {
      console.log(err)
    }

    if(!user) {
      console.log('user is not exist')
      return res.redirect('/')
    }

    user.comparePwd(pwd, function(err, isMatch) {
      if (err) {
        console.log(err)
      }

      if(isMatch) {
        console.log('pwd is true')
        req.session.user = user
        return res.redirect('/')
      }else {
        console.log('pwd is err')
        return res.redirect('/')
      }
    })
  })
})

//用户列表页面
router.get('/list', function (req, res) {
   console.log('列表页面');
   User.fetch(function(err,users) {
      console.log('查询所有数据。。。')
      if(err) {
         console.log(err)
      }
      console.log(users)
      res.render('userlist', {
         title: '用户管理',
         users: users
      })
  })
})


//删除功能
router.delete('/list', function(req, res) {
   console.log('删除动作...')
   var id = req.query.id

   if(id) {
      User.remove({_id: id}, function(err, book) {
         if(err) {
            console.log(err)
         }else {
            res.json({success: 1})
         }
      })
   }
   
})

module.exports = router;