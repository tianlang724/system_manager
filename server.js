let express = require('express');
let server = require('./server/router');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();

app.set('port', process.env.PORT || 3000);
server(app);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'dist')));
// //设置视图文件地址
// app.set('views','./dist');
// // 设置模板引擎
// app.engine('html', require('ejs').renderFile);
// app.set('view engine','html');
// app.get('/test', function(req, res) {
//     console.log('test');
//     res.send('test');
// });
// app.get('/', function (req, res) {
//     // res.render('index.html');
//     console.log('index');
//     // res.send('llllll')
//     res.render('book');
// });


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
module.exports = app;
