const express = require('express')
const app = express()

app.use(express.json())

const posts = [
    {id:1,title:"primeiro post",content:"Conteúdo do primeiro post"},
    {id:2,title:"segundo post",content:"Conteúdo do segundo post"}
]

app.get('/posts',(req,res)=>{
    res.json(posts)
})

const port = 3000
app.listen(port,()=>{
    console.log(`the server is running on port ${port}`)
})