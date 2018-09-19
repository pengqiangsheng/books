var express = require('express')
var mongoose = require('mongoose')
var app = express()
var logger = require('morgan')//日志模块
var cookieParser = require('cookie-parser')
var session = require('express-session') 
var MongoStore = require('connect-mongo')(session)
var dbUrl = 'mongodb://localhost/books'

mongoose.connect(dbUrl)

app.use(cookieParser())
//session 持久化
app.use(session({
  secret: 'book',
  store: new MongoStore({
    url: dbUrl,    
    collection: 'sessions'  
  }),  
  resave: true,  
  saveUninitialized: false
}))
//开发环境设置
if ('development' === app.get('env')) {
  app.set('showStackError', true)
  app.use(logger(':method :url :status'))
  app.locals.pretty = true
  mongoose.set('debug', true)
}

app.set('views', './src/views/pages/')//设置模板文件的目录
app.set('view engine', 'jade')//设置模板引擎
app.use(express.static('public'))//使用静态资源
app.locals.moment = require('moment')//时间格式化模块


require('./src/control/main')(app)//mvc--control

//启动
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
})


