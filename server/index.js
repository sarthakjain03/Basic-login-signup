require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())
app.use(cors())

let userData = []

app.get('/user', authenticateToken, async (req, res) => {
    const userEmail = req.userEmail;

    try {
        for(obj of userData){
            if(obj.email === userEmail){
                res.status(200).json({name: obj.name, email: obj.email, gender: obj.gender, phone: obj.phone})
            }
        }

    } catch (err) {
        console.log(err);
        res.status(500).json("Error in getting user data");
    }
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        let checks = 0
        for(obj of userData){
            if(obj.email === email){
                checks = 1;
                if(obj.password === password){
                    checks = 2;
                    break;
                }
                break;
            }
        }
        
        if(checks === 2){
            // code for jwt auth
            const accessToken = createToken(email)
            res.status(200).json({token: accessToken})

        } else if(checks === 1){
            res.status(200).json("Incorrect Password")
        } else {
            res.status(200).json("Email not registered")
        }

    } catch (err) {
        console.log(err);
        res.status(500).json("error");
    }
})

app.post('/signup', async (req, res) => {
    const { name, email, gender, phone, password } = req.body;
    const data = {
        name: name,
        email: email,
        password: password,
        gender: gender,
        phone: phone
    };

    try {
        // checking if already registered
        let registered = 0;
        for(obj of userData){
            if(obj.email === email){
                registered = 1;
                break;
            }
        }
        
        if(registered){
            res.status(200).json("Email registered");

        } else {
            userData.push(data)

            // code for jwt auth
            const accessToken = createToken(email)
            res.status(200).json({token: accessToken})
        }

    } catch (err) {
        console.log(err);
        res.status(500).json("Error in signup post request");
    }
});

// func to create Auth token.
function createToken(email) {
    const user = {email: email}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    return accessToken;
}

// middleware for get request.
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) return res.sendStatus(401)

    // verifying the token.
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, usermail) => {
        if(err) return res.sendStatus(403)
        req.userEmail = usermail.email;
        next()
    })
}

app.listen(5000, () => {
    console.log('Server listening on port 5000....')
})