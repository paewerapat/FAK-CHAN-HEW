const sql = require('../database/db')


const productByLocationCtrl = {
    createProductByLocation: async (req, res) => {
        try {
            const { product_id, location_id } = req.body
            await sql.query(`SELECT * FROM product JOIN location 
            ON location.location_id = ${location_id}
            WHERE product_id = ${product_id}`, async (err, data) => {
                if(err) throw err
                data = JSON.parse(JSON.stringify(data))[0]
                const values = {
                    product_id,
                    location_id,
                    product_name: data.product_name,
                    location_name: data.location_name
                }
                await sql.query(`INSERT INTO product_by_location SET?`, values, (err, result) => {
                    if(err) throw err;
                    result = JSON.parse(JSON.stringify(result))
                    console.log(data)
                    return res.status(200).json({
                        msg: "เพิ่มสินค้าตามสถานที่เรียบร้อยแล้ว!",
                        id: result.insertId,
                        values: data
                    })
                })
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getProductByLocation: async (req, res) => {
        try {
            await sql.query(`SELECT * FROM product_by_location
            JOIN product ON product.product_id = product_by_location.product_id
            JOIN location ON location.location_id = product_by_location.location_id`, (err, result) => {
                if(err) throw err
                result = JSON.parse(JSON.stringify(result))
                return res.status(200).json({productByLocation: result})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = productByLocationCtrl;