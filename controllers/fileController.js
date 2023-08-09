
  

const uploadImage=(req, res)=>{
    console.log('req',req.file);
    res.json({msg:"Image uploaded"})
}
module.exports={uploadImage}