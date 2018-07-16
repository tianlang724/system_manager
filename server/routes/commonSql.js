const mysql = require('mysql');
const address  = require("../config/address");
const {
    host,
    user,
    password,
    port,
    database
} = address;

let pool = mysql.createPool({
    host,
    user,
    password,
    port,
    database
});

// 接收一个sql对象
let query = function( sql ) {
    // 返回一个 Promise
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, ( err, rows) => {
                    // console.log(err);
                    // console.log(rows);
                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    // 结束会话
                    connection.release()
                })
            }
        })
    })
};
module.exports =  query;
