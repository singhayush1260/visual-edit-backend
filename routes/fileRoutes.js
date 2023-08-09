const router=require('express').Router();
const{uploadImage}=require('../controllers/fileController');


router.post('/upload',uploadImage);

module.exports=router;