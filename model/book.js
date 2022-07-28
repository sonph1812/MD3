const Connection = require("./connection");

class Book {
  constructor() {
    this.connection = Connection.createConnection();
    this.connection.connect((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Connect success!");
      }
    });
  }

  getBooks() {
    return new Promise((resolve, reject) => {
      this.connection.query("select * from kho", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  createBook(Book) {
    let insertQuery = `insert into kho(TenKho, MoTa, SLDeSach, SLSachTrongKho)
                           VALUES ('${Book.name}', "${Book.description}", '${Book.number_of_titles}', '${Book.number_of_books}')`;
    this.connection.query(insertQuery, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Insert success");
      }
    });
  }

  getBook(id) {
    return new Promise((resolve, reject) => {
      let query = `select * from kho where id = ${id}`;
      this.connection.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  updateBook(id, Book) {
    return new Promise((resolve, reject) => {
      let query = `update kho set TenKho = '${Book.name}', MoTa = '${Book.description}', SLDeSach = '${Book.number_of_titles}', SLSachTrongKho = '${Book.number_of_books}'  where id = ${Book.id}`;
      this.connection.query(query, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  deleteBook(id) {
    return new Promise((resolve, reject) => {
      let query = `delete from kho where id = ${id}`;
      this.connection.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
          console.log("Delete success");
        }
      });
    });
  }
}

module.exports = Book;
