const path = require('path');
const mysql  = require('mysql');
const bcrypt = require('bcryptjs');
const address  = require("../config/address");
const query = require('./commonSql');
const CODE = require('../../common/httpCodes');
const saltKey = 10;
const dataTable = 'users';
const ERR = {
    DUP_KEY: 'ER_DUP_ENTRY'
}
const USER_TYPE = {
    NORMOL: 'normal',
    ADMIN: 'admin'
};
let isCreated = false;


/**
 * 展示登陆注册页面
 * @param req
 * @param res
 */
exports.showSignin = function (req, res) {
    res.render("login");
};
/**
 * 用户登陆
 * @param req
 * @param res
 */
exports.userSignIn = function (req, res) {
    console.log('sign in ');
    console.log(req.body);
    const data = req.body;
    const input_pw = data.password;
    let sqlQuery = {
        sql: 'select * from '+ dataTable + ' where user_name = ?',
        values: [data.user_name],  // 作为对象的属性
    }
    query(sqlQuery).then(response => {
        console.log(response)
        if (response && response.length > 0) {
            let user = response[0];
            const isSame = bcrypt.compareSync(input_pw, user.password);
            if (isSame) {
                req.session.user = {
                    user_name: user.user_name,
                    role: user.role
                };
                if (user.role === USER_TYPE.ADMIN) {
                    // return res.render('index');
                } else if (user.role === USER_TYPE.NORMOL) {
                    // return res.render('index');
                }
               return res.json({code: CODE.SUCCESS, msg: 'Sign in success'});
            } else {
                return  res.json({code: CODE.PASSWORD_ERR, msg: 'Password error'});
            }
        } else {
            return res.json({code: CODE.NO_USER, msg: 'No user'});
        }

    }).catch(err => {
        console.log(err);
        return res.json({code: CODE.SIGN_IN_ERR, msg: 'Sign in error.'});
    })
};
/**
 * 用户注册
 * @param req
 * @param res
 */
exports.userSignUp = async function (req, res) {
    console.log('sign up ');
    console.log(req.body);
    const data = req.body;
    const salt = bcrypt.genSaltSync(saltKey);
    const hash = bcrypt.hashSync(data.password, salt);
    console.log('salt = ' + salt);
    console.log('hash = ' + hash);
    if (!isCreated) {
        try {
            await createUserTable();
        } catch (e) {
            console.log(e);
        }
    }
    let insertUser = {
        sql: 'insert into users(user_name,password)  values(?,?)',
        values: [data.user_name, hash]
    };
    query(insertUser).then(response => {
        return res.json({code: CODE.SUCCESS, msg: 'Sign up success'});
    }).catch(err => {
        if(err){
            // console.log(err);
            if (err.code === ERR.DUP_KEY) {
                return res.json({code: CODE.USER_EXIT, msg: 'Username is existed'});
            } else {
                return res.json({code: CODE.SIGN_UP_ERR, msg: 'Sign up error'});
            }
        }
    });

};

/*midware for user*/
exports.signinRequired = function (req, res, next) {
    console.log('get into index');
    let user = req.session.user;
    console.log('user = ' );
    console.log(user);
    if(!user) {
        return res.redirect('/signin');
    } else {
        return res.render('book')
    }
};

exports.adminRequired = function (req,res,next) {
    let user = req.session.user;
    if(user.role !== USER_TYPE.ADMIN) {
        return res.redirect('/signin');
    } else {
        return res.render('index');
    }
};

function createUserTable() {

    let createUsers = `create table if not exists ${dataTable}(
                          user_id int primary key auto_increment,
                          user_name varchar(255)not null,
                          password varchar(500) not null,
                          role varchar(20)  default 'normal',
                          unique (user_name)
                      )`;

    return  query(createUsers);
}

