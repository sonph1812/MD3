const Connection = require("./connection");

class Bookshelf {
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

  getBookshelfs() {
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

  createBookshelf(bookshelf) {
    let insertQuery = `insert into kho(name, price, description)
                           VALUES ('${bookshelf.category}', ${bookshelf.name}, '${bookshelf.description}', '${bookshelf.image}')`;
    this.connection.query(insertQuery, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Insert success");
      }
    });
  }

  getBookshelf(id) {
    return new Promise((resolve, reject) => {
      let query = `select *
                         from bookshelf
                         where id = ${id}`;
      this.connection.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  updateBookshelf(id, bookshelf) {
    let query = `update bookshelf set name = '${bookshelf.name}', price = ${bookshelf.price}, description= '${bookshelf.description}' where id = ${id}`;
    this.connection.query(query, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Update success");
      }
    });
  }

  deleteBookshelf(id) {
    let query = `delete from bookshelf where id = ${id}`;
    this.connection.query(query, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Delete success");
      }
    });
  }
seachByCateGory(name) {
  let query = `SELECT TenSach,TenTheLoai,MoTa FROM theloai inner join sach on sach.Theloai_id = theloai.id WHERE tentheloai LIKE %${name}%`;
  this.connection.query(query,(err,data)=> {
    if(err) {
      throw err.stack
    } 
    console.log(data)
  })
}


getBookshelfsCategory(name) {
  return new Promise((resolve, reject) => {
    this.connection.query(`select * from Sach join theloai on sach.theloai_id = theloai.id where tentheloai like '%${name.search}%'`, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
setBooksCategory() {
  return new Promise((resolve, reject) => {
    let query = `select TenTheLoai,TenSach,MoTa,HinhAnh from Sach join theloai on sach.theloai_id = theloai.id`
  this.connection.query(query,(err,data)=> {
    if(err) {
      reject(err)
    }
    resolve(data)
  })
  })
}

}


module.exports = Bookshelf;
