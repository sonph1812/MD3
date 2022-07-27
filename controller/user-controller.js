const User = require('../model/user');
const fs = require('fs');
const qs = require('qs');


class UserController {

    constructor(){
        this.user = new User();
    }

    showListUser(req,res){
        fs.readFile('views/admin.html','utf-8',async (err,data)=>{
            if(err){
                throw new Error(err.message)
            }
            else {
                let users = await this.user.getUser();
                let tbody ='';
                users.map((user,index)=>{
                    tbody += ` 
                    <tr>
                    <td ">${user.Username}</td>
                    <td ">${user.Password}</td>
                    <td ">${user.Address}</td>
                    <td ">${user.DOB} </td>
                    <td ">${user.Email}</td>
                    <td ">${user.PhoneNumber}</td>
                    // <td><a href="/views/update/${user.id}" class="btn btn-primary">Edit</a></td>
                    // <td><a href="/views/delete/${user.id}" class="btn btn-danger">Delete</a></td>
                    </tr>`
                });
                
                data = data.replace('{user}', tbody)
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write(data);
                return res.end();
            }
        });
    }
    showListUserManager(req,res){
        fs.readFile('views/manager.html','utf-8',async (err,data)=>{
            if(err){
                throw new Error(err.message)
            }
            else {
                let users = await this.user.getUser();
                let tbody ='';
                users.map((user,index)=>{
                    tbody += ` 
                    <tr>
                    <td ">${user.Username}</td>
                    <td ">${user.Password}</td>
                    <td ">${user.Address}</td>
                    <td ">${user.DOB} </td>
                    <td ">${user.Email}</td>
                    <td ">${user.PhoneNumber}</td>
                    <td><a href="/views/update/${user.id}" class="btn btn-primary">Edit</a></td>
                    <td><a href="/views/delete/${user.id}" class="btn btn-danger">Delete</a></td>
                    </tr>`
                });
                
                data = data.replace('{listUser}', tbody)
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write(data);
                return res.end();
            }
        });
    }
    showFormLogin(req, res){
        fs.readFile('views/login/login.html','utf-8',(err,data)=>{
            if(err){
                throw new Error(err.message)
            }
            else {                   
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write(data);
                return res.end();
             }
            })
    }
    showFormCreateUser(req,res){
        
            fs.readFile('views/register/register.html','utf-8',(err,data)=>{
                if(err){
                    throw new Error(err.message)
                }
            else {
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write(data);
                return res.end("ok");
            }
        });   
    }
    createUser(req,res) {
    
        let data = '';
        req.on('data', chunk =>{
            data += chunk;
        });
        req.on('end',async()=>{
            let user = qs.parse(data);
            // let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
            // if (!regexPassword.test(user.password)){
            //     console.log('Mật khẩu phải có hơn 8 kí tự và ít nhất 1 số !');
            // }else {
                this.user.checkRegisterUser(user.username, user.phonenumber).then((data)=>{
                    // console.log(data);
                    if(data.length == 0){
                        this.user.insertUser(user);
                        console.log(user.email);
                        this.user.createRole(user.email);
                        res.writeHead(301, {
                            location: '/login'
                        });
                        return res.end();
                       
                    }
                    else {
                        console.log('Email or phone da ton tai');
                        return res.end();
                    }
                })
               
            // }
            
        });
    }
    
    showUserEditForm(req,res, idUpdate){
        fs.readFile('views/update/update.html','utf-8',async(err,data)=>{
            if(err){
                throw new Error(err.message)
            }
            else {
                let user = await this.user.getUserId(idUpdate);
                if(user.length > 0) {
                    data = data.replace('{name}',user.Username);
                    data = data.replace('{email}', user.Email);
                    data = data.replace('{phone}',user.PhoneNumber);

                    // data = data.replace('{dob}',user.DOB); 
                    data = data.replace('{address}',user.Address);
                }
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write(data);
                return res.end();
             }
            })
    }
    editUser(req, res, id) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            let user = qs.parse(data);
            this.user.updateUser(id, user);
            res.writeHead(301, {
                location: '/user'
            });
            return res.end();
        });
    }

    loginUser(req, res){
      
        let data = '';
        req.on('data', chunk=>{
            data += chunk
        });

        req.on('end', async ()=>{
            let users = qs.parse(data); 
           await this.user.checkLoginUser(users.email, users.password).then(data =>{
            if(data.length !==0) {
                   this.user.checkRole(data[0].id).then(role =>{
                       if(role[0].Role_id == 0){
                           res.writeHead(301, {location:'/admin'})
                           return res.end();
                       }
                       else {
                           res.writeHead(301, {location:'/user'})
                           return res.end();
                       }
                   })  
            }
            else {
                    console.log('Tai khoan khong ton tai');
                    res.end()
                }
            });

            });    
        }

}
module.exports = UserController;
