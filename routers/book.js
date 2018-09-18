var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Book = require('../models/book')
var bodyParser = require('body-parser')
var _ = require('underscore')
router.use(bodyParser())//postbodyParser

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {

   if(req.session.user) {
      if(req.session.user.name === 'root') {
         console.log('正在处理book路由...Time: ', Date.now());
         next();
      }else {
         return res.redirect('/')
      }
   }else {
      return res.redirect('/')
   }
})

//列表页面
router.get('/list', function (req, res) {
   console.log('列表页面');

   Book.fetch(function(err,books) {
      console.log('查询所有数据。。。')
      if(err) {
         console.log(err)
      }
      res.render('list', {
         title: '列表页',
         books: books
      })
  })
})

//删除功能
router.delete('/list', function(req, res) {
   console.log('删除动作...')
   var id = req.query.id

   if(id) {
      Book.remove({_id: id}, function(err, book) {
         if(err) {
            console.log(err)
         }else {
            res.json({success: 1})
         }
      })
   }
   
})

router.get('/book', function (req, res) { 
   console.log('后台录入页面');
   res.render('admin', { 
   	title: '后台录入页面', 
   	book: {
   	_id: '',
   	title: '',	
		author: '',	
		country: '',
		language: '',		
		year: '',	
		poster: '',	
		summary: ''
   	}
   });
});

//修改页面
router.get('/update/:id', function (req,res) {
   console.log('后台更新页面');
	var id = req.params.id
   if(id) {
      Book.findById(id, function(err, book){
         res.render('admin', {
            title:'后台更新页面',  
            book: book
         })
      })
   }	
})


//新增页面
router.post('/book/new', function (req, res) {
   console.log('新增页面');
  	if(!req.body) return res.sendStatus(400);

  	var id = req.body.book._id
	var bookObj = req.body.book
   var _book

   if(id !== '') {
      //更新
      console.log('有id')
      Book.findById(id, function(err, book) {
         if(err) {
            console.log(err)            
         }
         //把bookObj的属性复制到book，并返回book对象
         _book = _.extend(book, bookObj)
         _book.save(function(err, book) {
            if(err) {
               console.log(err)
            }

            res.redirect('/book/' + book._id)
         })
         
      })
   }else { //新增
       console.log('没有id')
      _book = new Book({
         title: bookObj.title, 
         author: bookObj.author,   
         country: bookObj.country,
         language: bookObj.language,    
         year: bookObj.year,  
         poster: bookObj.poster,   
         summary: bookObj.summary
      })

      _book.save(function(err, book) {
         console.log('save ...')
         if(err) {
            console.log(err)
         }

         res.redirect('/book/' + book._id)
      })
   }
})



module.exports = router;