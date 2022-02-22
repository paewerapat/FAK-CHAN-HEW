const cloudinary = require('cloudinary')

// Setting Account Cloudinary
cloudinary.config({
    upload_preset: 'Fak-Chan-Hew',
    cloud_name: "dylwkduhq",
    api_key: "933649384521439",
    api_secret: "e1UP3AhLXKhOm0ru9UX3TajPM2Q"
})

const imagesCtrl = {
    destroyImages: async (req, res) => {
        try {
            const { images } = req.body
            for (const item of images) {
                await cloudinary.v2.uploader.destroy(item.public_id, (err, res) => {
                    if(err) throw err;
                })
            }
            res.status(200)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = imagesCtrl;