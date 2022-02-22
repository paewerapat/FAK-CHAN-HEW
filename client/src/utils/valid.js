export const valid = ({full_name, villagers_id, house_number, password, cf_password}) => {
    
    const err = {}

    if(!full_name) {
        err.full_name = "กรุณาใส่ชื่อ-นามสกุลของท่าน!"
    } else if (full_name.length > 50) {
        err.full_name = "ชื่อและนามสกุลต้องมีความยาวน้อยกว่า 50 ตัวอักษร!"
    }

    if(!villagers_id) {
        err.villagers_id = "กรุณาใส่เบอร์โทรศัพท์ของท่าน!"
    } else if (villagers_id.length > 10) {
        err.villagers_id = "เบอร์โทรศัพท์มีความยาวแค่ 10 ตัวอักษร!"
    }

    if(!house_number) {
        err.house_number = "กรุณาใส่บ้านเลขที่ของท่าน!"
    } else if (house_number.length > 10) {
        err.house_number = "บ้านเลขที่ของท่านมีความยาวมากเกินไป!"
    }

    if(!password) {
        err.password = "กรุณาใส่พาสเวิร์ดของท่าน!"
    } else if (password.length < 6) {
        err.password = "พาสเวิร์ดต้องความยาวอย่างน้อย 6 ตัวอักษรขึ้นไป"
    }

    
    if(password !== cf_password) {
        err.cf_password = "การยืนยันรหัสผ่านไม่ถูกต้อง!"
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}
