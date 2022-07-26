const Connection = require('./connection');

class User {
    constructor(){
        this.connection = Connection.createConnection();
        this.connection.connect((err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Connect success!');
            }
        });
    }
        getUser(req,res){
        return new Promise((resolve,reject)=>{
           this.connection.query('select * from User',(err,data)=>{
               if(err) {
                   reject(err);
               }
               else{
                   resolve(data)
               }
           })
        })   
       }
        insertUser(user){
           let createSql = "insert into User(Username,Password,Address,Email,PhoneNumber) values ('${user.username}','${user.password}','${user.address}','${user.email}','${user.phonenumber}')";
           this.connection.query(createSql, (err,data)=>{
               if(err){
                   console.log(err);
               }
               else {
                   console.log('Create Success !!');
               }
           })
       }
}
module.exports = User;