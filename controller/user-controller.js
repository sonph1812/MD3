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
                    </tr>`
                    // <td><a href="/views/update/${user.id}" class="btn btn-primary">Edit</a></td>
                    // <td><a href="/views/delete/${user.id}" class="btn btn-danger">Delete</a></td>
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
                    
                    <td><a href="/admin/user/edit?id=${user.id}" class="btn btn-primary">Edit</a></td>
                    <td><a href="/admin/user/delete?id=${user.id}" class="btn btn-danger">Delete</a></td>
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
        fs.readFile('views/user/edituser.html','utf-8',async(err,data)=>{
            if(err){
                console.log('File notfound');
            }
            else {
                let user = await this.user.getUserId(idUpdate);
               
                if(user.length > 0) {
                    data = data.replace('{id}',user[0].id);
                    data = data.replace('{name}',user[0].Username);
                    data = data.replace('{name}',user[0].Username);
                    data = data.replace('{email}', user[0].Email);
                    data = data.replace('{email}', user[0].Email);
                    data = data.replace('{password}', user[0].Password);
                    data = data.replace('{phone}',user[0].PhoneNumber);
                    data = data.replace('{dob}',user[0].DOB); 
                    data = data.replace('{address}',user[0].Address);
                    data = data.replace('{address}',user[0].Address);

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

        req.on('end', async() => {
            let user = qs.parse(data);
            this.user.updateUser(user.id, user).then(()=>{
                res.writeHead(301, {
                    location: '/admin/user'
                });
                return res.end();
            })
        });
    }

    deleteUser(req, res, id) {
        this.user.romeveUser(id).then(()=>{
            res.writeHead(301, {
                location: '/admin/user'
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
