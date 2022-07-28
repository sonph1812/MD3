const Book = require("../model/book");
const fs = require("fs");
const qs = require("qs");

class bookController {
  constructor() {
this.book = new Book()
  }

  showBookListPage(req, res) {
    fs.readFile('views/bookmanagement/list.html', 'utf-8', async (err, data) => {
      if (err) {
        console.log('File not Found');
      } else {
        let books = await this.book.getBooks();
        let tbody = '';
        books.map((book, index) => {
          tbody += ` <tr>
                                            <td>
                                                <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" id="customCheck${
              index + 1
          }">
                                                                <label class="custom-control-label" for="customCheck${
              index + 1
          }">&nbsp;</label>
                                                            </div>
                                            </td>
                                         
                                            <td>${books[index].TenSach}</td>
                                            <td>${books[index].MoTa}</td>
                                            <td>${books[index].TinhTrang_id}</td>
                                            <td>${books[index].TheLoai_id}</td>
                                            <td>${books[index].NXB_id}</td>
                                            <td>${books[index].Kho_id}</td>
                                            
                                            <td>
                                                <a href="/admin/bookmanagement/edit?=${books[index].id}" class="action-icon btn btn-primary text-white">Edit</a>
                                                <a href="/admin/bookmanagement/delete?=${books[index].id}" class="action-icon  btn btn-danger  text-white">Delete</a>
                                            </td>
                                        </tr>`
          data = data.replace('{listbook}', tbody);
          res.writeHead(200, {'content-type': 'text/html'});
          res.write(data);
          return res.end();
        })
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(data);
        return res.end();
      }
    })
  }


  showBookFormCreate(req, res) {
    fs.readFile("views/book/create.html", "utf-8", (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  }
  createbook(req, res) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let book = qs.parse(data);
      this.book.createBook(book);
      res.writeHead(301, {
        location: "/views/admin/book",
      });
      return res.end();
    });
  }

  showBookEditForm(req, res, idUpdate) {
    fs.readFile("views/book/edit.html", "utf-8", async (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        let book = await this.book.getBook(idUpdate);
        if (book.length > 0) {
          data = data.replace("{id}", book[0].id);
          data = data.replace("{name}", book[0].TenKho);
          data = data.replace("{number-of-titles}", book[0].SLDeSach);
          data = data.replace("{number-of-books}", book[0].SLSachTrongKho);
          data = data.replace("{description}", book[0].MoTa);
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  }

  editBook(req, res, id) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let book = qs.parse(data);
      this.book.updateBook(id, book).then(() => {
        res.writeHead(301, {
          location: "/views/admin/book",
        });
        return res.end();
      });
    });
  }

  deleteBook(req, res, id) {
    this.book.deleteBook(id).then(() => {
      res.writeHead(301, {
        location: "/views/admin/book",
      });
      return res.end();
    });
  }
}

module.exports = bookController;
