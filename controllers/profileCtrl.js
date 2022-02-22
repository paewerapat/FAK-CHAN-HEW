const sql = require("../database/db");
const bcrypt = require('bcrypt');


const profileCtrl = {
    updateProfile: async (req, res) => {
        try {
            const data = "UPDATE villagers SET ? WHERE villagers_id = " + req.user.villagers_id;
            await sql.query(data, req.body, 
            (err, result) => {
                if(err) throw err;
                res.json({msg: "อัพเดทโปรไฟล์เรียบร้อยแล้ว!"})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updatePassword: async (req, res) => {
        try {
            
            const { newPassword } = req.body;

            const salt = await bcrypt.genSalt(10);
            const enPassword = await bcrypt.hash(newPassword, salt);

            const data = "UPDATE villagers SET password =? WHERE villagers_id =?"
            const password = [enPassword, req.user.villagers_id];

            await sql.query(data, password, (err, result) => {
                if(err) throw err;
                res.status(200).json({msg: "อัพเดทรหัสผ่านเรียบร้อยแล้ว!"})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = profileCtrl