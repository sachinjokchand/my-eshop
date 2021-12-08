import express from 'express'
import multer from 'multer' 
import path from 'path'
const router = express.Router()


const storage = multer.diskStorage({
    destination(req , file , cb){
        cb(null , './uploads')
    },
    filename(req , file , cb){
        cb(null , `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file , cb){
    const fileTypes = /jpg|jpeg|png/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype)
    if(extname && mimeType){
        return cb(null , true)
    }else{
        cb('Image only!')
    }
}

const upload = multer({
    storage , 
    fileFilter:function(req , file  , cb){
        checkFileType(file , cb)
    }
}).single('image')

router.post('/' , (req , res)=>{
    upload(req , res , (err)=>{
        if(err){
            res.send(err)
        }else{
            res.send(`/${req.file.path}`)
        }
    })
    
})


export default router