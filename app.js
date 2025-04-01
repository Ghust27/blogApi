const express = require('express')
const app = express()

app.use(express.json())

app.get('/posts',(req,res)=>{
    
})

const port = 3000
app.listen(port,()=>{
    console.log(`The server is running on port ${port}`)
})