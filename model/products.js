const db = require("../config");
class Products{
    fetchProducts(req,res){
        const query =` SELECT prodID, prodName, quantity, amount, prodInfo, prodUrl FROM Products;
        `;
        db.query(query,(err, results)=>{
            if (err) throw err
            res.json({
                status:res.statusCode,
                results
            })
        })
    }

    fetchProduct(req, res) {
        const query = `
        SELECT prodID, prodName, quantity, amount, prodInfo, prodUrl 
        FROM Products
        WHERE prodID = ${req.params.id};
        `;
        db.query(query,
            (err, result) => {
                if(err) throw err
                res.json({
                    status: res.statusCode,
                    result
                })
            })
      }
      deleteProduct(req, res) {
        const query = `DELETE FROM Products WHERE prodID = ${req.params.id};
        `;
        db.query(query, (err)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "Product Removed"
            })
        })
      }




}



module.exports = Products



// const db = require("../config");

// class Products {

//   //show every item
    
//   fetchProducts(req, res) {
//     const query = `SELECT prodID, prodName, quantity, amount, category, prodUrl FROM Products;`
//     db.query(query, (err, results) => {
//       if (err) throw err;
//       res.json({
//         status: res.statusCode,
//         results,
//       });
//     });
//   }

//   //show item

//   fetchProduct(req, res) {
//     const query = `SELECT prodID, prodName, quantity, amount, category, prodUrl FROM Products WHERE prodID = '${req.params.id}';`
//     db.query(query, (err, result) => {
//       if (err) throw err;
//       res.json({
//         status: res.statusCode,
//         result,
//       });
//     });
//   }

//   //add item
  
//   addProduct(req, res) {
//     const query = `INSERT INTO Products SET ?;`
//     db.query(query, req.body, (err) => {
//       if (err) throw err;
//       res.json({
//         status: res.statusCode,
//         message: "A new product has been added.",
//       });
//     });
//   }

//   //make changes on product details
  
//   updateProduct(req, res) {
//     const query = `UPDATE Products SET ? WHERE prodID = '?';`
//     db.query(query, [req.body, req.params.id], (err) => {
//       if (err) throw err;
//       res.json({
//         status: res.statusCode,
//         message: "Product has been updated.",
//       });
//     });
//   }

//   //delete product
  
//   deleteProduct(req, res) {
//     const query = `DELETE FROM Products WHERE prodID = "${req.params.id}";`
//     db.query(query, (err) => {
//       if (err) throw err;
//       res.json({
//         status: res.statusCode,
//         message: "Product is removed.",
//       });
//     });
//   }
// }
// module.exports = Products;
