require('dotenv').config();
const express=require('express')
const cors=require('cors')
const path = require('path');
const connectDB=require('./data/connect_db');
const authRoutes=require('./routes/authRoutes');
const fileRoutes=require('./routes/fileRoutes');
const editRoutes=require('./routes/editRoutes');

const upload=require('./multer/multer');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://0.0.0.0:27017'

const app=express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth',authRoutes);
app.use('/api/file',upload.single('image'),fileRoutes);
app.use('/api/edit',editRoutes);

app.use('/api/test',(req,res)=>{
    try{
        console.log('inside test route')
       console.log(req.body);
    }catch(e){
        console.log('error',e)
    }
});

connectDB(MONGO_URI);

app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`)
})
