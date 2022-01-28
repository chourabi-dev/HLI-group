var sha1 = require('sha1');
const jwt = require('jsonwebtoken');


require('dotenv').config()



exports.createAccount = function(req,res){
    const MongoClient = require('mongodb').MongoClient;

    MongoClient.connect('mongodb://localhost:27017/').then((con) => {
        const db = con.db('hlitodoapp');

        let chuck = [];
        req.on('data', (data) => {
            chuck.push(data);
        }).on('end', () => {
            console.log(chuck);
            const txt = Buffer.concat(chuck).toString();
            console.log(txt);
            let jsonBody = JSON.parse(txt);

            if (jsonBody.username != null && jsonBody.password != null) {
                const user = {
                    username: jsonBody.username,
                    password: sha1(jsonBody.password)

                };



                db.collection("users").find({username:jsonBody.username}).toArray().then((check)=>{
                   
                    if ( check.length === 0) {
                        db.collection('users').insertOne(user).then((insert) => {
                            // OK !! 
                            res.send({ success: true, message: "account created successfully" });
        
                        }).catch((errorInsert) => {
                            res.send({ success: false, message: "Something went wrong while trying to create account" });
                        });
                    } else {
                        res.send({ success: true, message: "username already in use." });
                    }
                })

            } else {
                res.send({ success: false, message: "bad request" });
            }


        }).catch((err) => {
            console.log(err);
            res.send({ success: false, message: "Something went wrong" });
        });


    })
}



exports.auth = function(req,res){

    const MongoClient = require('mongodb').MongoClient;

    MongoClient.connect('mongodb://localhost:27017/').then((con) => {
        const db = con.db('hlitodoapp');

        let chuck = [];
        req.on('data', (data) => {
            chuck.push(data);
        }).on('end', () => {
            console.log(chuck);
            const txt = Buffer.concat(chuck).toString();
            console.log(txt);
            let jsonBody = JSON.parse(txt);

            if (jsonBody.username != null && jsonBody.password != null) {
               

                db.collection("users").find({username:jsonBody.username, password:   sha1(jsonBody.password)  }).toArray().then((check)=>{
                  if (check.length === 1) {
                    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (3600),  username: jsonBody.username }, process.env.secret)
                    
                    console.log(token);
                    
                    res.send({ token : token });
                    
                  } else{
                    res.send({ success: false, message: "wrong username or password." });
                  }
                  
                })

            } else {
                res.send({ success: false, message: "bad request" });
            }


        }).catch((err) => {
            console.log(err);
            res.send({ success: false, message: "Something went wrong" });
        });


    })
}