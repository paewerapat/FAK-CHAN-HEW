const sql = require('../database/db')


const locationCtrl = {
    createLocation: async (req, res) => {
        try {
            await sql.query(`INSERT INTO location SET?`, req.body, (err, result) => {
                if(err) throw err;
                result = JSON.parse(JSON.stringify(result));
                res.status(200).json({
                    location: result.insertId,
                    msg: "เพิ่มสถานที่เรียบร้อยแล้ว!"
                })
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getlocation: async (req, res) => {
        try {
            await sql.query(`SELECT * FROM location ORDER BY location_id DESC`, (err, result) => {
                if(err) throw err;
                result = JSON.parse(JSON.stringify(result))
                return res.status(200).json({location: result})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}


module.exports = locationCtrl;