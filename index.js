const express = require('express')
const cors = require('cors')
const db = require('./src/db/db')
require('dotenv').config()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())

app.get('/',(req,res)=>{
    res.json({message:"API FUNCIONANDO!"})
})

app.get('/test-db',async (req,res)=>{
    try{
        const result = await db.query('select now()')
        res.json({sucess:true, serverTime:result.rows[0].now})
    }catch (err){
        console.log('error ao executar a query.',err)
        res.status(500).json({sucess:false, error:"Não foi possivel se conectar ao banco de dados."})
    }
})







app.listen(PORT, ()=>{
    console.log(`The server is running on the port: ${PORT}`)
})