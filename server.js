

const http = require('http');
const url = require('url');
const fs= require('fs');

const Usercontroller = require('./controller/user-controller')
const ErrorController = require('./controller/error-contrller');
const HomeController = require('./controller/home-controller')
const bookshelfcontroller = require('./controller/bookshelf-controller')
let bookController = new bookshelfcontroller()
let errorController = new ErrorController();
let userController = new Usercontroller();
let homeController = new HomeController();

const mimeTypes = {
    "html": "text/html",
    "js": "text/javascript",
    "css": "text/css",
    "min.js": "text/javascript",
    "js.map": "text/javascript",
    "css.map": "text/css",
    "min.css": "text/css",
    "jpg": "image/jpg",
    "png": "image/png",
    "gif": "image/gif",
    "woff": "text/html",
    "ttf": "text/html",
    "woff2": "text/html",
    "eot": "text/html",
};

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
        case '/views/admin':{
            fs.readFile('views/admin.html','utf-8',(err,data)=>{
                if(err){
                    throw new Error(err.message)
                }
                else {
                    res.writeHead(200, {'Content-Type':'text/html'});
                    res.write(data);
                    return res.end();
                 }
                });

            break;
        }
        case '/views/login/': {
            
        if(method === 'GET') {
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
            else {
            userController.loginUser(req, res);
            }

            break;
        }

        case "/views/user/":{
            userController.showListUser(req,res);
            break;
        }

        case '/views/update/':{
            if(method == 'GET'){
                userController.showUserEditForm(req, res);
            }
            else {
                userController.editUser(req,res)
            }
            break;
        }
    
        case '/search':{
            if(method == 'GET'){
                bookController.showSearch(req, res);
            }
            else {
                bookController.findByCategory(req, res)
            }
            break;

          }

        default: 

            const filesDefences = req.url.match(/\.js|\.css|\.png|\.jpg/);
            if (filesDefences) {
                const extension = mimeTypes[filesDefences[0].toString().split('.')[1]];
                res.writeHead(200, { 'Content-Type': extension });
                fs.createReadStream(__dirname + "/" + req.url).pipe(res)
            } else {
                res.end();
            }

            // errorController.showError404Page(req,res);
            break;
        
    }
})

server.listen(8003, ()=>{
    console.log('Server is running http//:localhost:3000');
});