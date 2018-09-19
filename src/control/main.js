var bodyParser = require('body-parser')
var Book = require('../models/book')
var bookRouter = require('../routers/book')
var userRouter = require('../routers/user')

module.exports = function(app) {

	//postbodyParser
	app.use(bodyParser()) 

    //预处理用户逻辑
    app.use(function(req, res, next) {
        var _user = req.session.user
        app.locals.user = _user
        next()
    })

    app.use('/admin', bookRouter) //图书管理路由页面
    
    app.use('/user', userRouter) //用户管理路由页面

    //主页
    app.get('/', function(req, res) {
        console.log(req.session.user)
        //查找所有数据，并且按照更新时间排序
        Book.fetch(function(err, books) {
            console.log('查询所有数据。。。')
            if (err) {
                console.log(err)
            }
            res.render('index', {
                title: '书屋',
                books: books
            })
        })
    })

    //注销登录状态
    app.get('/logout', function(req, res) {
        delete req.session.user
        delete app.locals.user

        res.redirect('/')
    })

    //详情页面
    app.get('/book/:id', function(req, res) {
        console.log('详情页');

        var id = req.params.id
        Book.findById(id, function(err, book) {
            res.render('detail', {
                title: '详情页',
                book: book
            })
        })
    })

    //错误处理
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('500错误,服务器逻辑错误！错误信息：' + err.stack);
    })
    app.use(function(req, res, next) {
        res.status(404).send('404错误,页面找不到!');
    })
}