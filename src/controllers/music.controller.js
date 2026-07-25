const musicModel = require("../models/music.model");
const userModel = require("../models/music.model");
const {uploadFile} = require("../services/storage.service")
const jwt = require("jsonwebtoken");

async function createMusic(req,res) {
     const token = req.cookies.token;

     if(!token){
         return res.status(401).json({message: "unAuth user"})
     }

     try{
       const decoded = jwt.verify(token,process.env.JWT_SECRET)

       if(decoded.role !=="artist"){
          return res.status(403).json({message: "unAuth user"})
       }
     

     const {title} = req.body
     const file = req.file

     const result = await uploadFile(file.buffer.toString('base64'))

     const music = await musicModel.create({
        uri: result.url,
        title,
        artist: decoded.id,
     })

    res.status(200).json({
        message: "music created",
        music:{
          id: music._id,
          uri: music.uri,
          title: music.title,
          artist: music.artist
        }
    })
}
    catch(err){
        return res.status(401).json({message: "Unauthorized"})
     }
}    
module.exports = {createMusic}