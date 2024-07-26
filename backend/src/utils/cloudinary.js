import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        else {
            const res = await cloudinary.uploader.upload(localFilePath, {
                resource_type: 'auto'
            });
            console.log('Cloudinary upload response:', res); // Add this line for debugging
            fs.unlink(localFilePath, (err) => {
                if (err) console.error('Error removing file:', err);
            });
            return res;
        }
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }

}

export { uploadOnCloudinary }