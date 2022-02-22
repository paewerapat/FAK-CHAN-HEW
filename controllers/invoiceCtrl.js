const sql = require('../database/db')


function paginating(page) {
    const limit = 3
    const offset = page > 1
    ? limit * (page - 1)
    : 0
    return `LIMIT ${limit} OFFSET ${offset}`
}

const invoiceCtrl = {
    createInvoice: async (req, res) => {
        try {
            await sql.query(`INSERT INTO invoice SET?`, req.body, (err, result) => {
                if(err) throw err;
                result = JSON.parse(JSON.stringify(result))
                return res.status(200).json({
                    msg: 'เพิ่มใบฝากซื้อสินค้าเรียบร้อยแล้ว!',
                    invoice: result.insertId
                })
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getInvoice: async (req, res) => {
        try {
            await sql.query(`SELECT COUNT(*) FROM invoice
            JOIN product_by_location ON  product_by_location.product_by_location_id = invoice.product_by_location_id
            WHERE status = 'รอการตอบรับ' AND desired_time > CURRENT_TIMESTAMP 
            ${req.query.location ? `AND location_id LIKE '%${req.query.location}%'` : ''}`
            , async (err, count) => {
                if(err) throw err;
                count = JSON.parse(JSON.stringify(count))[0]

                await sql.query(`SELECT * FROM invoice
                JOIN product_by_location ON  product_by_location.product_by_location_id = invoice.product_by_location_id
                WHERE status = 'รอการตอบรับ' AND desired_time > CURRENT_TIMESTAMP 
                ${req.query.location ? `AND location_id LIKE '%${req.query.location}%'` : ''}
                ORDER BY invoice_id DESC
                ${req.query.page !== '' && paginating(Number(req.query.page))}`, 
                (err, result) => {
                    if(err) throw err;
                    result = JSON.parse(JSON.stringify(result))
                    return res.status(200).json({
                        invoice: result,
                        result: Object.values(count)[0]
                    })
                })
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getInvoiceDetail: async (req, res) => {
        try {
            await sql.query(`SELECT * FROM invoice
            JOIN product_by_location ON invoice.product_by_location_id = product_by_location.product_by_location_id
            JOIN location ON location.location_id = product_by_location.location_id
            WHERE invoice_id = ${req.params.id}`, (err, result) => {
                if(err) throw err;
                result = JSON.parse(JSON.stringify(result))[0]
                return res.status(200).json({invoice: result})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    acceptInvoice: async (req, res) => {
        try {
            const { invoice_id, rider_id } = req.body
            await sql.query(`UPDATE invoice SET rider_id = '${rider_id}', status = 'กำลังจัดซื้อ'
            WHERE invoice_id = ${invoice_id}`, async (err, result) => {
                if(err) throw err;
                return res.status(200).json({msg: "คุณรับออเดอร์ใบฝากซื้อนี้แล้ว!"})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getMyInvoice: async (req, res) => {
        try {
            await sql.query(`SELECT COUNT(*) FROM invoice 
            WHERE client_id = ${req.user.villagers_id}
            ${req.query.status ? `AND status = '${req.query.status}'` : ''}`,
            async (err, count) => {
                if(err) throw err;
                count = JSON.parse(JSON.stringify(count))[0]

                await sql.query(`SELECT * FROM invoice
                JOIN product_by_location ON product_by_location.product_by_location_id = invoice.product_by_location_id
                WHERE client_id = ${req.user.villagers_id}
                ${req.query.status ? `AND invoice.status = '${req.query.status}'` : ''}`, 
                (err, result) => {
                    if(err) throw err;
                    result = JSON.parse(JSON.stringify(result))
                    return res.status(200).json({
                        invoice: result,
                        result: Object.values(count)[0]
                    })
                })
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getMyShipment: async (req, res) => {
        try {
            await sql.query(`SELECT COUNT(*) FROM invoice 
            WHERE rider_id = ${req.user.villagers_id}
            ${req.query.status ? `AND status = ${req.query.status}` : ''}`,
            async (err, count) => {
                if(err) throw err;
                count = JSON.parse(JSON.stringify(count))[0]

                await sql.query(`SELECT * FROM invoice
                JOIN product_by_location ON product_by_location.product_by_location_id = invoice.product_by_location_id
                WHERE rider_id = ${req.user.villagers_id}
                ${req.query.status ? `AND status = ${req.query.status}` : ''}`, 
                (err, result) => {
                    if(err) throw err;
                    result = JSON.parse(JSON.stringify(result))
                    return res.status(200).json({
                        shipment: result,
                        result: Object.values(count)[0]
                    })
                })
            })
            
        } catch (err) {
            return res.stauts(500).json({msg: err.message})
        }
    },
    alreadyShipped: async (req, res) => {
        try {
            await sql.query(`UPDATE invoice SET status = 'จัดส่งแล้ว' WHERE rider_id = ${req.user.villagers_id}`
            , (err, result) => {
                if(err) throw err;
                return res.status(200).json({msg: "ออเดอร์ใบฝากซื้อจัดส่งสำเร็จแล้ว!"})
            })
        } catch (err) {
            return res.stauts(500).json({msg: err.message})
        }
    },
    invoiceSuccess: async (req, res) => {
        try {
            await sql.query(`UPDATE invoice SET status = 'เสร็จสิ้น' WHERE client_id = ${req.user.villagers_id}`, 
            (err, result) => {
                if(err) throw err;
                return res.status(200).json({msg: "ใบฝากซื้อของคุณสำเร็จแล้ว!"})
            })
        } catch (err) {
            return res.stauts(500).json({msg: err.message})
        }
    }
}


module.exports = invoiceCtrl