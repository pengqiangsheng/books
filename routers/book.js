var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser());//postbodyParser

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('正在处理book路由...Time: ', Date.now());
  next();
});

//列表页面
router.get('/list', function (req, res) {
   console.log('列表页面');
   res.render('list', { 
   	title: '列表页',
   	books: [{
   		title: '时生',
   		_id: 1,
   		author: '东野圭吾',
   		country: 'Japanese',
   		meta: [ {CreateAt: new Date()}] ,
   		poster: '/images/timg.jpg'
   	},{
   		title: '时生',
   		_id: 2,
   		author: '东野圭吾',
   		country: 'Japanese',
   		meta: [{CreateAt: new Date()}] ,
   		poster: '/images/timg.jpg'
   	},{
   		title: '时生',
   		_id: 3,
   		author: '东野圭吾',
   		country: 'Japanese',
   		meta: [{CreateAt: new Date()}] ,
   		poster: '/images/timg.jpg'
   	},{
   		title: '时生',
   		_id: 4,
   		author: '东野圭吾',
   		country: 'Japanese',
   		meta: [{CreateAt: new Date()}] ,
   		poster: '/images/timg.jpg'
   	},{
   		title: '时生',
   		_id: 5,
   		author: '东野圭吾',
   		country: 'Japanese',
   		meta: [{CreateAt: new Date()}] ,
   		poster: '/images/timg.jpg'
   	},{
   		title: '时生',
   		_id: 6,
   		author: '东野圭吾',
   		country: 'Japanese',
   		meta: [{CreateAt: new Date()}] ,
   		poster: '/images/timg.jpg'
   	}]
	
	});
});

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
	if(id){
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
	}
});

//详情页面
router.get('/book/:id', function (req, res) {
   console.log('详情页');
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
   });
});

//新增页面
router.post('/book/new', function (req, res) {
   console.log('新增页面');
  	if(!req.body) return res.sendStatus(400);

  	var id = req.body.book._id
	var bookObj = req.body.book 
	res.send('book.author: ' + req.body.book.author); 
});



module.exports = router;