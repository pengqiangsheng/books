var express = require('express');
var app = express();
var book = require('./routes/book');
//设置模板文件的目录
app.set('views', './views')
//设置模板引擎
app.set('view engine', 'jade');
//使用静态资源
app.use(express.static('public'));
//图书路由页面
app.use('/book',book);

//主页
app.get('/', function (req, res) {
   res.render('index', { title: 'Hey', message: 'Hello there!'});
});
//错误处理
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});