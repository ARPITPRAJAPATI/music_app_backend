const ImageKit = require("@imagekit/nodejs");
const { Folders } = require("@imagekit/nodejs/resources.js");


const ImageKitClient = new ImageKit({
    privateKey: process.env.image_kit
})

async function uploadFile(file){
    

    const result = await ImageKitClient.files.upload({
        file,
        
        fileName: "music_"+ Date.now(),

        folder: "music_backend/music"
    })
    return result;
}

module.exports = {uploadFile}