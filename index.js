const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./src/db/db')
const userRoutes = require('./src/routes/users')
const authMiddleware = require('./src/middlewares/auth')
const postsRoutes = require('./src/routes/posts');



require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/api/posts', postsRoutes);
app.use('/api/users',userRoutes)

app.get('/',(req,res)=>{
    res.json({message:"API is running."})
})

app.get('/test-db',async (req,res)=>{
    try{
        const result = await db.query('select now()')
        res.json({success:true, serverTime:result.rows[0].now})
    }catch (err){
        console.log('error executing query.',err)
        res.status(500).json({sucess:false, error:"Unable to connect to the database. "})
    }
})





const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`The server is running on the port: ${PORT}`)
})