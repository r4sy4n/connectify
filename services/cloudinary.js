const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
  cloud_name: process.env.CLODUNARY_NAME,
  api_key: process.env.CLODUNARY_API_KEY,
  api_secret: process.env.CLODUNARY_API_SECRET
});


// Upload to cloudinary
const uploadFiles = (path, folder) => {
    return cloudinary.uploader.upload(path, { folder })
    .then ((data) => {
        return { url: data.url, public_id: data.public_id };
    })
    .catch((error) => {
        console.error(error)
    })
}

// Remove from cloudinary
const removeFiles = (public_id) => {
    return cloudinary.uploader.destroy(public_id, (error, result) => {
        console.log(error, result);
    });
}

module.exports = { uploadFiles, removeFiles }