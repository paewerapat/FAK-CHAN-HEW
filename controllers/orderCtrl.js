const sql = require("../database/db");


function paginating(page) {
    const limit = 5
    const offset = page > 1
    ? limit * (page - 1)
    : 0
    return `LIMIT ${limit} OFFSET ${offset}`
}

const orderCtrl = {
    buyProductOrder: async (req, res) => {
        const { sale_id, quantity } = req.body
        try {
            await sql.query(`UPDATE product_sale SET inventories = inventories - ${quantity} WHERE sale_id = ${sale_id}`, 
            async (err, result) => {
                if(err) throw err;

                await sql.query(`INSERT INTO sale_order SET ?`, req.body, (err, result) => {
                    if(err) throw err;
    
                    result = JSON.parse(JSON.stringify(result))
                    res.status(200).json({
                        msg: "สั่งซื้อสินค้าสำเร็จ!",
                    })
                })

            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getBuyProductOrder: async (req, res) => {
        try {
            await sql.query(`SELECT COUNT(*) FROM sale_order 
            WHERE Buyer_ID = ${req.user.villagers_id} ${req.query.status ? `AND order_status = ${req.query.status}` : ''}
            `, async (err, count) => {
                if(err) throw err;
                count = JSON.parse(JSON.stringify(count))[0]

                await sql.query(`SELECT * FROM sale_order
                JOIN product_sale ON product_sale.sale_id = sale_order.sale_id
                WHERE buyer_id = ${req.user.villagers_id} ${req.query.status ? `AND order_status = ${req.query.status}` : ''}
                `, (err, result) => {
                    if(err) throw err;
    
                    result = JSON.parse(JSON.stringify(result))
                    res.status(200).json({
                        orderBuyProduct: result,
                        result: Object.values(count)[0]
                    })
                })
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getProductSaleOrder: async (req, res) => {
        try {
            await sql.query(`SELECT COUNT(*) FROM sale_order
            JOIN product_sale ON product_sale.sale_id = sale_order.sale_id
            WHERE product_sale.seller_id = ${req.user.villagers_id}
            ${req.query.status ? `AND order_status = '${req.query.status}'` : ''}`, 
            async (err, count) => {
                if(err) throw err;
                count = JSON.parse(JSON.stringify(count))[0]

                await sql.query(`SELECT * FROM sale_order
                JOIN product_sale ON product_sale.sale_id = sale_order.sale_id
                WHERE product_sale.seller_id = '${req.user.villagers_id} '
                ${req.query.status ? `AND order_status = '${req.query.status}'` : ''}
                ORDER BY order_date desc
                ${req.query.page && `${paginating(Number(req.query.page))}`}`, 
                (err, result) => {
                    if(err) throw err;
                    result = JSON.parse(JSON.stringify(result))
                    console.log(result);
                    res.status(200).json({
                        orderProductSale: result,
                        result: Object.values(count)[0]
                    })
                })
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateOrderProductSale: async (req, res) => {
        try {
            const { values, sale_id } = req.body
            await sql.query(`UPDATE sale_order SET order_status = '${values}' WHERE sale_id = ${sale_id}`,
            (err, result) => {
                if(err) throw err;

                result = JSON.parse(JSON.stringify(result))
                res.status(200).json({
                    msg: 'อัพเดทสถานะออเดอร์สำเร็จ!',
                    result
                })
            })
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    },
    updateBuyProduct: async (req, res) => {
        try {
            await sql.query(`UPDATE sale_order status = 'เสร็จสิ้น' WHERE buyer_id = ${req.user.villagers_id}`
            , (err, result) => {
                if(err) throw err;
                return res.status(200).json({msg: "ออเดอร์คำสั่งซื้อของคุณเสร็จสิ้นแล้ว!"})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = orderCtrl