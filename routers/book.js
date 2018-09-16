var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Book = require('../models/book')
var bodyParser = require('body-parser')
var _ = require('underscore')
router.use(bodyParser())//postbodyParser

mongoose.connect('mongodb://localhost/books')

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('正在处理book路由...Time: ', Date.now());
  next();
});

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
   /*静态渲染
   res.render('list', { 
   	title: '列表页',
   	books: [{
   		title: '时生',
   		_id: 1,
   		author: '东野圭吾',
   		country: 'Japanese',
   		meta: [ {CreateAt: new Date()}] ,
   		poster: '/images/timg.jpg'
   	}]
	})*/
});

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

   /*静态渲染
   if(id) {
		res.render('admin',{
			title:'后台更新页面',
	   	book: {
	   	title: '时生',	
			author: '东野圭吾',	
			country: '日本',
			language: '日语',		
			year: '2012',	
			poster: 'https://note.gitku.cn/images/alipay.jpg',	
			summary: '这是一本神奇的书，再过几年，你会结婚生子，并给这个孩子取名为时生，时间的时，生命的生！'
	   	}
		})
	}*/
});

//详情页面
router.get('/book/:id', function (req, res) {
   console.log('详情页');

   var id = req.params.id
   Book.findById(id,function(err, book) {
      res.render('detail', {
         title: '详情页',
         book: book
      })
   })
   /*静态渲染
   res.render('detail', { 
   	title: '详情页', 
   	book: {
		title: '时生',	
		author: '东野圭吾',	
		country: '日本',
		language: '日语',		
		year: '2012',	
		poster: 'https://note.gitku.cn/images/alipay.jpg',	
		summary: '这是一本神奇的书，再过几年，你会结婚生子，并给这个孩子取名为时生，时间的时，生命的生！'
   	}
   });*/
});

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

            res.redirect('/admin/book/' + book._id)
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

         res.redirect('/admin/book/' + book._id)
      })
   }
	//res.send('book.author: ' + req.body.book.author); 
})



module.exports = router;