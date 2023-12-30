const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/Employee');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/employee');

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))       
});  

// app.post('/register', (req, res) => {
//     const { name, email, password } = req.body;
//     const existingEmployee = EmployeeModel.findOne({ email: email });
//     if (existingEmployee) {
//         return res.status(400).json({ message: 'User with this email already exists' });
//     } else {
//         EmployeeModel.create(req.body)
//             .then(employees => res.json(employees))
//             .catch((err) => res.status(500).json({ error: err.message }));
//     } 
// });

// app.post('/login', (req, res) => {
//     const { email, password } = req.body;  
//     EmployeeModel.findOne({ email: email })
//         .then(user => {
//         if(user){
//             if ( user.password === password) {
//                 res.json("Success");
//             } else {
//                 res.json("Login Failed");
//             }
//         }else{
//             res.json("User does not exist");
//         }
//         })
// });

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    EmployeeModel.findOne({ email: email })
    .then((user)=>{
        if(user){
            if(user.password === password){
                const token= jwt.sign(
                    {id:user._id, email:user.email},
                    "j1etyui876*^&^%$#",
                    {expiresIn:3600},
                );
                res.json({token:token});
            } else {
                res.status(401).json({message:"Login Failed"});
            }
        } else {
            res.status(404).json({message:"User does not exist"});
        }
    });
});

app.get('/user',authenticationToken, (req, res) => {
    res.json(req.user);
    }); 


function authenticationToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.status(401).json({message:"Token not found"});
    }
    jwt.verify(token, "j1etyui876*^&^%$#", (err, user)=>{
        if(err){
            return res.status(403).json({message:"Invalid token"});
        }
        req.user = user;
        next();
    });
}


app.listen(5000, () => {
    console.log('Server has started!');
}
);