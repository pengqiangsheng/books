var express = require('express')
var mongoose = require('mongoose')
var Book = require('./models/book')
var app = express()
var bookRouter = require('./routers/book')
var userRouter = require('./routers/user')
var bodyParser = require('body-parser')

var cookieParser = require('cookie-parser')
var session = require('express-session')
 
app.use(cookieParser())
app.use(session({
    secret: 'book'
}))

app.set('views', './views/pages/')//设置模板文件的目录
app.set('view engine', 'jade')//设置模板引擎
app.use(express.static('public'))//使用静态资源
app.use('/admin',bookRouter)//图书管理路由页面
app.use('/user',userRouter)//图书管理路由页面
app.locals.moment = require('moment')//时间格式化模块

mongoose.connect('mongodb://localhost/books')
//主页
app.get('/', function (req, res) {
  console.log(req.session.user)
  //查找所有数据，并且按照更新时间排序
  Book.fetch(function(err,books) {
    console.log('查询所有数据。。。')
    if(err) {
      console.log(err)
    }
    res.render('index', { 
    title: '书屋', 
    books: books
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
//启动
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
})


