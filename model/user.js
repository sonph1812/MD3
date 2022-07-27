const fs = require('fs');
const { resolve } = require('path');
const Connection = require('./connection');

class User {
    constructor(){
        this.connection = Connection.createConnection();
        this.connection.connect((err) => {
            if(err){
                throw new Error(err.message)
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
           let createSql = `insert into User(Username,Password,Address,Email,PhoneNumber) values ('${user.username}','${user.password}','${user.address}','${user.email}','${user.phonenumber}')`;
           this.connection.query(createSql, (err,data)=>{
            if(err){
                throw new Error(err.message)
            }
               else {
                   console.log('Create Success !!');
               }
           })
       }

       createRole(email) {

        let checkRole = `select id from User where Email = '${email}'`
        this.connection.query(checkRole,(err,data)=>{
            if(err){
                console.log(err);
            }
            else {
                let queryRole = `insert into UserRole(User_id, Role_id) values (${data[0].id},1);`
                this.connection.query(queryRole, (err,data)=>{
                    if(err){
                        throw new Error(err.message);
                    }
                       else {
                           console.log('Create Role Success !!');
                       }
                   })
            }
        })
            
        }

        checkRole(user){
            return new Promise((resolve, reject)=>{
                let query = `select Role_id from UserRole where User_id = ${user};`
                this.connection.query(query,(err,data)=>{
                    if(err){
                        reject(err.message)
                    }
                       else {
                           resolve(data)
                       }
                
                })
            })
        }

       checkRegisterUser(email,phone) {
        return new Promise((resolve, reject)=>{
            let checkQuery = `select * from User where (Email = '${email}' or PhoneNumber = '${phone}');`
            this.connection.query(checkQuery,(err,data)=>{
                if(err){
                    reject(err);
                }
                else {
                    resolve(data);
                }
            })
        })
       }
       checkLoginUser(email, password) {
        return new Promise((resolve, reject)=>{
            let checkQuery = `select * from User where (Email = '${email}' and  Password = '${password}');`
        
            this.connection.query(checkQuery,(err,data)=>{
                if(err){
                    reject(err);
                }
                else {
    
                    resolve(data);
                }
            })
        })
       }
      
       getUserId(id) {
        return new Promise((resolve,reject)=>{
            let query = `select * from User where id = ${id}`;
            this.connection.query(query,(err,data)=>{
                if(err){
                    reject(err);
                }
                else {
                    resolve(data);
                }
            })
        })
       }

       updateUser(id, user) {
        let query =`update User set Username = '${user.username}',Password='${user.password}',Address='${user.address}',
        Email='${user.email}',PhoneNumber='${user.phonenumber}' where id = ${id};`
        this.connection.query(query,(err,data)=>{
            if(err){
                throw new Error(err.message)
            } else {
                console.log('Update success')
            }
        })
       }

       deleteProduct(id){
        let query = `delete from User where id = ${id}`;
        this.connection.query(query, (err, data) => {
            if(err){
                throw new Error(err.message)
            } else {
                console.log('Delete success')
            }
        })
        }
        
}
module.exports = User;