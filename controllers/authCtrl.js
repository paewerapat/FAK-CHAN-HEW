const sql = require("../database/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const authCtrl = {
    register: async (req, res) => {
        try {
    
            const { villagers_id, password, full_name, house_number, alley } = req.body;
    
            // Check Villagers_ID
            await sql.query(`SELECT * FROM villagers WHERE villagers_id = ${villagers_id}`, (err, result) => {
                if (err) {
                  console.log("error: ", err);
                  return res.status(500).send('Sever Error!');
                }
                if (result.length > 0) {
                  return res.status(400).send('เบอร์โทรศัพท์นี้มีในระบบเรียบร้อยแล้ว.');
                }
            });
    
            // Encrypt
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(password, salt);
    
            //Save Villagers
            const newVillagers = {
                villagers_id: villagers_id, 
                password: newPassword, 
                full_name: full_name, 
                house_number: house_number, 
                alley: alley,
            };
    
            await sql.query(`INSERT INTO villagers SET ?`, newVillagers, (err, result) => {
                if (err) throw err;
                res.status(200).json({
                    msg: "สมัครสมาชิกเรียบร้อยแล้ว!"
                })
            })
    
        } catch (err) {
            console.log(err);
            res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {
            const { villagers_id, password} = req.body;
            await sql.query(`SELECT * FROM villagers WHERE villagers_id = ${villagers_id}`, async (err, result) => {
                if (err) throw err;
                result = await JSON.parse(JSON.stringify(result));

                const data = await result.find(e => e.villagers_id === villagers_id)
                if(!data) return res.status(400).json({msg: "ไม่พบสมาชิกนี้ในระบบ!"});

                // Check Password
                const isMatch = await bcrypt.compare(password, data.password);
                if(!isMatch) return res.status(400).json({msg: 'รหัสผ่านไม่ถูกต้อง!'})
        
                // // Create payload
                const payload = {
                    villagers_id: data.villagers_id,
                    full_name: data.full_name,
                    house_number: data.house_number,
                    alley: data.alley,
                    avatar: data.avatar,
                    role: data.role,
                }
        
                // Get token
                jwt.sign(payload, "jwtSecret", {
                    expiresIn: '14d'
                }, (err,token) => {
                    if(err) throw err;
                    res.json({ 
                        msg: "คุณเข้าสู่ระบบเรียบร้อยแล้ว!",
                        token,
                        payload
                    });
                })
            })

        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    currentUser: async (req, res) => {
        try {
            const { villagers_id } = req.user
            await sql.query(`SELECT * FROM villagers WHERE villagers_id = ${villagers_id}`, async (err, result) => {
                if(err) throw err
                result = JSON.parse(JSON.stringify(result));
                
                const data = await result.find(e => e.villagers_id === villagers_id)
                return res.status(200).json({user: data})
            })
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    getServiceCharge: async (req, res) => {
        try {
            await sql.query(`SELECT * FROM services LIMIT 1`, (err, result) => {
                if(err) throw err;
                result = JSON.parse(JSON.stringify(result))[0]
                return res.status(200).json({
                    distanceCharge: result.distance_charge,
                    serviceCharge: result.service_charge
                })
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = authCtrl