const sql = require("../database/db");


function paginating(page) {
    const limit = 5
    const offset = page > 1
    ? limit * (page - 1)
    : 0
    return `LIMIT ${limit} OFFSET ${offset}`
}

const productSaleCtrl = {
    addProductSale: async (req, res) => {
        try {
            const insert = "INSERT INTO product_sale SET ?"
            await sql.query(insert, req.body, async (err, result) => {
                if(err) throw err;
                result = JSON.parse(JSON.stringify(result))
                res.status(200).json({
                    msg: "เพิ่มสินค้าขายเรียบร้อยแล้ว!",
                    IdproductSale: result.insertId
                })
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getProductSale: async (req, res) => {
        try {
            await sql.query(`SELECT COUNT(*) FROM product_sale
            WHERE inventories > 0 AND status = 'มีสินค้า' ${req.query.search ? `AND salename LIKE
            '%${req.query.search}%'` : ''} ${req.query.category ? `AND category_id LIKE '%${req.query.category}%'` : ''}`
            , async (err, count) => {
                if(err) throw err;
                count = JSON.parse(JSON.stringify(count))[0]

                await sql.query(`SELECT * FROM product_sale
                WHERE inventories > 0 AND status = 'มีสินค้า' ${req.query.search ? `AND salename LIKE
                '%${req.query.search}%'` : ''} ${req.query.category ? `AND category_id LIKE '%${req.query.category}%'` : ''}
                ORDER BY updated DESC ${req.query.page && '' && paginating(Number(req.query.page))} `, 
                (err, result) => {
                    if(err) throw err;
                    result = JSON.parse(JSON.stringify(result))
                    res.status(200).json({
                        productSale: result, 
                        result: Object.values(count)[0]
                    })
                })
            })        
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getProductSaleDetail: async (req, res) => {
        try {
            await sql.query(`SELECT * FROM product_sale WHERE sale_id = ${req.params.id}`, (err, result) => {
                if(err) throw err;
                result = JSON.parse(JSON.stringify(result))[0]
                res.status(200).json({result})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    myProductSale: async (req, res) => {
        try {
            await sql.query(`SELECT COUNT(*) FROM product_sale WHERE seller_id = ${req.user.villagers_id}
            ${req.query.status ? `AND status = '${req.query.status}'` : ''}`
            , async (err, count) => {
                if(err) throw err;
                count = JSON.parse(JSON.stringify(count))[0]
                
                await sql.query(`SELECT * FROM product_sale WHERE seller_id = ${req.user.villagers_id}
                ${req.query.status ? `AND status = '${req.query.status}'` : ''}
                ORDER BY sale_id DESC
                ${req.query.page !== '' && paginating(Number(req.query.page))}`, 
                (err, result) => {
                    if(err) throw err;
                    result = JSON.parse(JSON.stringify(result))
                    res.status(200).json({
                        myProductSale: result, 
                        result: Object.values(count)[0]
                    })
                })
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateProductSale: async (req, res) => {
        try {
            const { sale_id, salename, description, price, inventories } = req.body
            const values = {
                salename: salename,
                description: description,
                price: price,
                inventories: inventories,
                status: 'มีสินค้า'
            }
            await sql.query(`UPDATE product_sale SET? WHERE sale_id = ${sale_id} AND seller_id = ${req.user.villagers_id}`,
            values, (err, result) => {
                if(err) throw err;
                result = JSON.parse(JSON.stringify(result))
                return res.status(200).json({msg: `อัปเดทข้อมูลสินค้าขาย #${sale_id} เรียบร้อยแล้ว!`})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProductSale: async (req, res) => {
        try {
            await sql.query(`DELETE FROM product_sale WHERE product_id = ${req.params.id}`, (err, result) => {
                if(err) throw err;
                return res.status(200).json({msg: "ลบรายการสินค้าขายเรียบร้อยแล้ว!"})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    stockProductSale: async (req, res) => {
        try {
            const { id } = req.body
            await sql.query(`UPDATE product_sale SET status = สินค้าหมด AND inventories = 0 WHERE sale_id = ${id}`, (err, result) => {
                if(err) throw err;
                return res.status(200).json({msg: "อัปเดตข้อมูลสต็อกสินค้าเรียบร้อยแล้ว!"})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = productSaleCtrl