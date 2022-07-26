const User = require('../model/user');
const fs = require('fs');
const qs = require('qs');


class UserController {

    constructor(){
        this.user = new User();
    }

    showListUser(req,res){
        fs.readFile('views/user/list-user.html','utf-8',async (err,data)=>{
            if(err){
                console.log('File Not Found');
            }
            else {
                let users = await this.user.getUser();
                let tbody ='';
                users.map((user,index)=>{
                    tbody += ` 
                    <tr>
                    <td ">${index +1}</th>
                    <td ">${user.Username}</td>
                    <td ">${user.Password}</td>
                    <td ">${user.Address}</td>
                    <td ">${user.DOB} </td>
                    <td ">${user.Email}</td>
                    <td ">${user.PhoneNumber}</td>
                  </tr>`
                });
                data = data.replace('{user}', tbody)
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write(data);
                return res.end();
            }
        });
    }
    showFormCreateUser(req,res){
        try{
            fs.readFile('views/register/register.html','utf-8',(err,data)=>{
            if(err){
                console.log('File Not Found');
               
            }
            else {
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write(data);
                return res.end("ok");
            }
        });
        }catch{err => {
            console.log(err.message);
        }}
        
    }
    createUser(req,res) {
        let data = '';
        req.on('data', chunk =>{
            data += chunk;
        });
        req.on('end',()=>{
            let user = qs.parse(data);
            this.user.insertUser(user);
            res.writeHead(301,{
                location:'/views/login/'
            });
            res.end();
        });
    }
}
module.exports = UserController;
