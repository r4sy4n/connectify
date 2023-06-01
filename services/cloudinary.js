const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
  cloud_name: "devd4eszq",
  api_key: "182553736194725",
  api_secret: "YvPqe0bS0pjLyPWxnhv3wZC_qqs"
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