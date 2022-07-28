const Connection = require("./connection");

class Search {
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


seachByCateGory() {
  let query = `select TenSach,TenTheLoai,MoTa,TinhTrang from Sach join theloai  on sach.theloai_id = theloai.id
  join tinhtrangsach on sach.tinhtrang_id = tinhtrangsach.id`;
  this.connection.query(query,(err,data)=> {
    if(err) {
      throw err.stack
    } 
    console.log(data)
  })
}


getBookshelfsCategory(name) {
  return new Promise((resolve, reject) => {
    this.connection.query(`select TenSach,Sach.MoTa as 'SachMoTa',TenTheLoai,TinhTrang,TenKho,Kho.Mota as 'KhoMoTa',SLDeSach,SLSachTrongKho from Sach join theloai on sach.theloai_id = theloai.id
    join tinhtrangsach on sach.tinhtrang_id = tinhtrangsach.id
    join kho on sach.kho_id = kho.id
     where 		tentheloai like '%${name.search}%'
			or tinhtrang like '%${name.search}%'
            or tenkho like '%${name.search}%'
            or TenSach like '%${name.search}%'
            `, (err, data) => {
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
    let query = `select TenSach,Sach.MoTa as 'SachMoTa',TenTheLoai,TinhTrang,TenKho,Kho.Mota as 'KhoMoTa',SLDeSach,SLSachTrongKho from Sach join theloai on sach.theloai_id = theloai.id
    join tinhtrangsach on sach.tinhtrang_id = tinhtrangsach.id
    join kho on sach.kho_id = kho.id`
  this.connection.query(query,(err,data)=> {
    if(err) {
      reject(err)
    }
      resolve(data)
  })
  })
}


}


module.exports = Search;
