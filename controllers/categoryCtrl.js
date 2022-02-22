const sql = require("../database/db");


const categoryCtrl = {
    createCategory: async (req, res) => {
        try {
            const data = "INSERT INTO product_category SET?";
            await sql.query(data, req.body, (err, result) => {
                if(err) throw err;
                result = JSON.parse(JSON.stringify(result));

                res.status(200).json({
                    msg: "เพิ่มหมวดหมู่สินค้าเรียบร้อยแล้ว!",
                    newCategory: result.insertId
                })
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getCategory: async (req, res) => {
        try {
            
            await sql.query("SELECT * FROM product_category", (err, result) => {
                if(err) throw err;
                result = JSON.parse(JSON.stringify(result));

                res.status(200).json({
                    category: result
                })
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { category_id, category_name } = req.body
            await sql.query(`UPDATE product_category SET category_name = '${category_name}' WHERE category_id = ${category_id}`,
            req.body, (err, result) => {
                if(err) throw err;
                return res.status(200).json({msg: "อัพเดทหมวดหมู่เรียบร้อยแล้ว!"})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async (req, res) => {
        try {
            await sql.query(`DELETE FROM product_category WHERE category_id = ${req.params.id}`,
            (err, result) => {
                if(err) throw err;
                return res.status(200).json({msg: "ลบหมวดหมู่เรียบร้อยแล้ว!"})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = categoryCtrl;