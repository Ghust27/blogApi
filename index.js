const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./src/db/db')
const userRoutes = require('./src/routes/users')
require('dotenv').config()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/api/users',userRoutes)

app.get('/',(req,res)=>{
    res.json({message:"API FUNCIONANDO!"})
})

app.get('/test-db',async (req,res)=>{
    try{
        const result = await db.query('select now()')
        res.json({success:true, serverTime:result.rows[0].now})
    }catch (err){
        console.log('error ao executar a query.',err)
        res.status(500).json({success:false, error:"Não foi possivel se conectar ao banco de dados."})
    }
})







app.listen(PORT, ()=>{
    console.log(`The server is running on the port: ${PORT}`)
})