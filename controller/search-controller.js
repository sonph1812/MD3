const fs = require("fs");
const qs = require("qs");
const Search = require("../model/search");

class SearchController {
  constructor(){
    this.search = new Search();
  }
showSearch(req, res){
  fs.readFile('views/search/team.html','utf-8', async (err,data)=> {
    if(err) {
      console.log(`File không tồn tại`)
    } else {
        const bookshelfs = await this.search.setBooksCategory();
        let tbody = '';         
        bookshelfs.forEach((item, index)=>{
          tbody += ` <tr>
                                            <td>
                                                <div class="custom-control custom-checkbox">
                                          
                                                <label class="custom-control-label" for="customCheck${
                                                index + 1
                                                }">&nbsp;</label>
                                                </div>
                                            </td>
                                            <td>${item.TenSach}</td>
                                            <td>${item.SachMoTa}</td>
                                            <td>${item.TenTheLoai}</td>
                                            <td>${item.TinhTrang}</td>
                                            <td>${item.TenKho}</td>
                                            <td>${item.KhoMoTa}</td>
                                            <td>${item.SLDeSach}</td>
                                            <td>${item.SLSachTrongKho}</td>

                                        </tr>`;
        })
        
            data = data.replace("{bookshelfs}", tbody);
          
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            return res.end();
      };
})
}

   findByCategory(req, res) {
          fs.readFile('views/search/team.html','utf-8', async (err,data)=> {
            if(err) {
              console.log(`File không tồn tại`)
            } else {
              let data1 = "";
              req.on("data",(chunk) => {
                data1 += chunk;
              }); 
              req.on("end", async() => {
                let data2 = qs.parse(data1);
                const bookshelfs = await this.search.getBookshelfsCategory(data2);
                let tbody = ''              
                bookshelfs.forEach((item, index)=>{
                  tbody += ` <tr>
                                                    <td>
                                                        <div class="custom-control custom-checkbox">      
                                                         <label class="custom-control-label" for="customCheck${
                                                         index + 1
                                                         }">&nbsp;</label>
                                                         </div>
                                                    </td>
                                                    <td>${item.TenSach}</td>
                                            <td>${item.SachMoTa}</td>
                                            <td>${item.TenTheLoai}</td>
                                            <td>${item.TinhTrang}</td>
                                            <td>${item.TenKho}</td>
                                            <td>${item.KhoMoTa}</td>
                                            <td>${item.SLDeSach}</td>
                                            <td>${item.SLSachTrongKho}</td>
                                                </tr>`;
                })
                    data = data.replace("{bookshelfs}", tbody);
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.write(data);
                    return res.end();
              });  
            }
          })
      }
    }

module.exports = SearchController;
