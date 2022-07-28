const http = require("http");
const url = require("url");
const fs = require("fs");
const qs = require("qs");

const ErrorController = require("./controller/error-controller");
const HomeController = require("./controller/home-controller");
const BookConTroller = require("./controller/book_controller")
let errorController = new ErrorController();
let homeController = new HomeController();
let bookController = new BookConTroller();

const mimeTypes = {
  html: "text/html",
  js: "text/javascript",
  css: "text/css",
  "min.js": "text/javascript",
  "js.map": "text/javascript",
  "css.map": "text/css",
  "min.css": "text/css",
  jpg: "image/jpg",
  png: "image/png",
  gif: "image/gif",
  woff: "text/html",
  ttf: "text/html",
  woff2: "text/html",
  eot: "text/html",
};

let server = http.createServer((req, res) => {
  let path = url.parse(req.url);
  let pathUrl = path.pathname;

  let method = req.method;

  switch (pathUrl) {
    case "/": {
      homeController.showHomePage(req, res);
      break;
    }

    case "/views/admin/book": {
      bookController.showBookListPage(req, res);
      break;
    }

    case "/views/admin/book/create": {
      if (method === "GET") {
        bookController.showBookFormCreate(req, res);
      } else {
        bookController.createbook(req, res);
      }
      break;
    }

    case "/views/admin/book/edit": {
      let query = qs.parse(path.query);
      let idUpdate = query.id;
      if (method === "GET") {
        bookController.showBookEditForm(req, res, idUpdate);
      } else {
        bookController.editBook(req, res, idUpdate);
      }
      break;
    }
    case '/test':{

      fs.readFile("views/test.html", "utf-8", (err, data) => {
        if (err) {
          console.log("File NotFound!");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          return res.end();
        }
      });
      break;
    }

    case "/views/admin/book/delete": {
      let query = qs.parse(path.query);
      let idUpdate = query.id;
      if (method === "GET") {
        bookController.deleteBook(req, res, idUpdate);
      } else {
        bookController.showBookListPage(req, res);
      }
      break;
    }
   

    default:
      const filesDefences = req.url.match(/\.js|\.css|\.png|\.jpg/);
      if (filesDefences) {
        const extension = mimeTypes[filesDefences[0].toString().split(".")[1]];
        res.writeHead(200, { "Content-Type": extension });
        fs.createReadStream(__dirname + "/" + req.url).pipe(res);
      } else {
        res.end();
      }

      // errorController.showError404Page(req,res);
      break;
  }
});

server.listen(3000, () => {
  console.log("Server is running http//:localhost:8003");
});
