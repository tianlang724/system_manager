let User = require("./routes/user");
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let session = require('express-session');
let MySQLStore = require('express-mysql-session')(session);
let address = require('./config/address');
const {
    host,
    user,
    password,
    port,
    database,
} = address;
module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, '../dist')));
// //设置视图文件地址
    app.set('views',path.join(__dirname, '../dist'));
    app.engine('html', require('ejs').renderFile);
    // 设置模板引擎
    app.set('view engine', 'html');
    // 用户信息持久化
    const options = {
        host,
        user,
        password,
        port,
        database,
        // The maximum age of a valid session; milliseconds:
        expiration: 60 * 60 * 1000,
    };
    const sessionStore = new MySQLStore(options);
    app.use(session({
        key: 'user',
        secret: 'password',
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 1000 * 60 * 60}   /*设置缓存时间，非常重要！！！！设置过短导致缓存失效，请求错误*/
    }));
    //路由设置
    // app.get('/', function (req, res) {
    //     console.log('index');
    //     res.send('lllll');
    // });
    app.get('/', User.signinRequired);
    app.get('/signin', User.showSignin);
    app.post('/user/signin', User.userSignIn)
    app.post('/user/signup', User.userSignUp)
}