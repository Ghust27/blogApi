const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../db/db')

router.post('/register',async (req,res)=>{
    try{
        const {username,email,password} = req.body
        
        if(!username || !email || !password){
            return res.status(400).json({error:'missing required fields'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const queryText = `
        insert into users (username,email,password)
        values ($1, $2, $3)
        returning id, username, email;        
        `

        const values = [username, email, password]

        const result = await db.query(queryText, values)

        return res.status(201).json(result.rows[0])

    }catch (err){
        console.error("Error registering user",error)
        res.status(500).json({error:"Server error"})
    }
})

module.exports = router