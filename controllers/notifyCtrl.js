const sql = require("../database/db");

const notifyCtrl = {
    createNotify: async (req, res) => {
        try {
            const { recipients, url, text } = req.body
            const values = {
                recipients,
                url,
                text,
                user: req.user.villagers_id
            };
            await sql.query(`INSERT INTO notify SET?`, values, (err, result) => {
                if(err) throw err;
                result = JSON.parse(JSON.stringify(result))
                return res.json({notifies: result.insertId})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getNotify: async (req, res) => {
        try {

            await sql.query(`SELECT * FROM notify 
            JOIN villagers ON villagers.villagers_id = notify.user
            WHERE recipients = ${req.user.villagers_id} ORDER BY id DESC`, 
            (err, result) => {
                if(err) throw err;
                result = JSON.parse(JSON.stringify(result))
                return res.json({
                    notifies: result,
                    result: result.length
                })
            })
           
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    readNotify: async (req, res) => {
        try {
            await sql.query(`UPDATE notify SET readed = 'true'`, (err, result) => {
                if(err) throw err;
                result = JSON.parse(JSON.stringify(result))
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = notifyCtrl