var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


mongoose.connect(
    process.env.MONGODB_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));


const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String
});
const userModel = mongoose.model('User', userSchema);

//Creates a new User
router.post('/createUser', (req, res)=>{
    console.log(req.body);
    const user = new userModel({
        fname: req.body.firstName,
        lname: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    console.log(user);
    user.save().then(() => console.log("One entry added"));
})

//Check is user exists or not
router.get('/checkUser', (req, res)=>{
    const email = req.query.email
    console.log(req.query)
    userModel.findOne({email: email},(err, docs)=>{
        if (!err) {
            console.log(docs)
            if(docs === null){
                res.send('notFound')
            }
            else{
                res.send('Found');
            }
            
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    })
})

//Check for Login
router.post('/checkLogin', (req, res)=>{
    console.log('hello')
    const email = req.query.email
    const password = req.query.password
    userModel.findOne({email:email}, (err, docs)=>{
        if(!err){
            if(docs === null){
                res.send('notFound')
            }
            else if(docs.password === password){
                res.send('password matched successfully');
            }
            else{
                res.send('incorrect password')
            }
        }
    })
})

//Get Name form Email
router.get('/checkName', (req, res)=>{
    let email = req.query.email
    console.log(email)
    // userModel.find({email: email}, (err, docs)=>{
    //     if(!err){
    //         res.send(docs)
    //         console.log(docs)
    //     }
        
    // })
    let query = userModel.find({email:email}).select('fname lname')
    query.exec(function (err, doc) {
        if (err) return next(err);
        res.send(doc);
    });
})

module.exports = router;
