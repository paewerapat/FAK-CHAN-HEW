const sql = require("../database/db");


function paginating(page) {
    const limit = 5
    const offset = page > 1
    ? limit * (page - 1)
    : 0
    return `LIMIT ${limit} OFFSET ${offset}`
}

const userCtrl = {
    getAllMembers: async (req, res) => {
        try {
            await sql.query(`SELECT COUNT(*) FROM villagers
            ${req.query.role ?` WHERE role = ${req.query.role}` : ''}`,
            async (err, count) => {
                if(err) throw err;
                count = JSON.parse(JSON.stringify(count))[0]

                await sql.query(`SELECT * FROM villagers 
                ${req.query.role ?` WHERE role = ${req.query.role}` : ''} ORDER BY role DESC
                ${req.query.page && paginating(Number(req.query.page))}
                `, async (err, result) => {
                    if(err) throw err;
                    result = await JSON.parse(JSON.stringify(result));
                    res.status(200).json({
                        members: result,
                        result: Object.values(count)[0]
                    })
                })
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateMembers: async (req, res) => {
        try {
            const { villagers_id } = req.body
            await sql.query(`UPDATE villagers SET role = 1 WHERE villagers_id = ${villagers_id}`, 
            (err, result) => {
                if(err) throw err;
                result = JSON.parse(JSON.stringify(result));
                return res.status(200).json({msg: "อัพเดทสิทธิ์การเป็นสมาชิกแล้ว!"})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getProfileUser: async (req, res) => {
        try {
            await sql.query(`SELECT * FROM villagers WHERE villagers_id = ${req.params.id}`, 
            (err, result) => {
                if(err) throw err;
                result = JSON.parse(JSON.stringify(result))[0];
                return res.status(200).json({profile: result})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getMyCart: async (req, res) => {
        try {
            await sql.query(`SELECT cart FROM villagers WHERE villagers_id = ${req.user.villagers_id}`,
            (err, result) => {
                if(err) throw err;
                result = JSON.parse(JSON.stringify(result))[0];
                if(result.cart !== null && result.cart.length > 0) {
                    result.cart = JSON.parse(result.cart)
                    return res.status(200).json({cart: result.cart});
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateMyCart: async (req, res) => {
        try {
            const { values } = req.body;
            await sql.query(`UPDATE villagers SET cart = '${values}' WHERE villagers_id = ${req.user.villagers_id}`,
            (err) => {
                if(err) throw err;
                return res.status(200).json({msg: 'อัพเดทตะกร้าเรียบร้อยแล้ว!'})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteAllCart: async (req, res) => {
        try {
            await sql.query(`UPDATE villagers SET cart = NULL WHERE villagers_id = ${req.user.villagers_id}`,
            (err) => {
                if(err) throw err;
                return res.status(200).json({msg: 'ลบสินค้าในตะกร้าทั้งหมดแล้ว!'})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = userCtrl;