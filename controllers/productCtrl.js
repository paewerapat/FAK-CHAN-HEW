const sql = require("../database/db");


const productCtrl = {
    createProduct: async (req, res) => {
        try {
            const insert = "INSERT INTO product SET?";
            await sql.query(insert, req.body, (err, result) => {
                if(err) throw err;
                result = JSON.parse(JSON.stringify(result));
                res.status(200).json({msg: "เพิ่มสินค้าสำเร็จแล้ว!", newProduct: result.insertId})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getProduct: async (req, res) => {
        try {
            await sql.query("SELECT * FROM product", (err, result) => {
                if(err) throw err;
                result = JSON.parse(JSON.stringify(result));
                res.status(200).json({
                    products: result
                })
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { product_id } = req.query
            await sql.query(`UPDATE product SET ? WHERE product_id = ${product_id}`, req.body, 
            (err, result) => {
                if(err) throw err;
                return res.status(200).json({msg: "อัพเดทสินค้าเรียบร้อยแล้ว!"})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProduct: async (req, res) => {
        try {
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = productCtrl;