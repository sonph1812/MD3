

const http = require('http');
const url = require('url');
const fs= require('fs');

const Usercontroller = require('./controller/user-controller')
const ErrorController = require('./controller/error-contrller');
const HomeController = require('./controller/home-controller')

let errorController = new ErrorController();
let userController = new Usercontroller();
let homeController = new HomeController();


let server = http.createServer((req,res)=>{
    let path = url.parse(req.url)
    let pathUrl = path.pathname;
    let method = req.method;
    switch(pathUrl) {
        case '/': {
            homeController.showHomePage(req,res);
            break;
        }
        case '/views/register/':{
            
            if(method ==='GET') {
                userController.showFormCreateUser(req,res);
            }
            else {     
                userController.createUser(req,res);
            }
            break;
          }
        case '/views/login/': {
    
        fs.readFile('views/login/login.html','utf-8',(err,data)=>{
            if(err){
                console.log('File Not Found');
            }
            else {
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write(data);
                return res.end();
             }
            })
            break;
             }
        case "/views/user/list-user":{
            userController.showListUser(req,res);
            break;
        }
        case '/favicon.ico': {
            return res.end();
        }

        default: {
            errorController.showError404Page(req,res);
            break;
        }
    }
})

server.listen(8080, ()=>{
    console.log('Server is running http//:localhost:8080');
});