const mysql = require('mysql');

class Connection {
    
    static createConnection(){
        let connect = {
            host:'localhost',
            user:'root',
            password: '123456',
            database:'BookManagement'
        }
        return mysql.createConnection(connect);
    }
}
module.exports = Connection;