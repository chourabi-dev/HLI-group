const { ObjectId } = require('mongodb');
const URL = require('url');
const fs = require('fs');


exports.addNewTodo = function (req, res) {

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

            if (jsonBody.title != null && jsonBody.content != null) {
                const document = {
                    title: jsonBody.title,
                    content: jsonBody.content,
                    date: new Date()

                };



                db.collection('todos').insertOne(document).then((insert) => {
                    // OK !! 
                    res.send({ success: true, message: "todo inserted successfully." });

                }).catch((errorInsert) => {
                    res.send({ success: false, message: "Something went wrong while trying to insert data!!" });
                });

            } else {
                res.send({ success: false, message: "bad request" });
            }


        }).catch((err) => {
            console.log(err);
            res.send({ success: false, message: "Something went wrong" });
        });


    })





}


exports.getTodosList = function (req, res) {

    const MongoClient = require('mongodb').MongoClient;

    MongoClient.connect('mongodb://localhost:27017/').then((con) => {
        const db = con.db('hlitodoapp');
 
        db.collection('todos').find({}).toArray().then((arrayResult)=>{
            res.send(arrayResult);
        })

        }).catch((err) => {
            const errMsg = err.toString();
            const errDate = new Date().toString();

            fs.appendFile('./logs/error.txt',errDate+' '+errMsg+'\n',function(err){
                throw err;

            })

            res.send({ success: false, message: "Something went wrong" });
        }); 
}



exports.deleteTodo = function (req, res) {

    const MongoClient = require('mongodb').MongoClient;

    MongoClient.connect('mongodb://localhost:27017/').then((con) => {
        const db = con.db('hlitodoapp');
 
        const id = URL.parse(req.url,true).query.id;

        if (id != null) {
            db.collection('todos').find({ _id : ObjectId(id) }).toArray().then((arrayResult)=>{
                if (arrayResult.length === 0) {
                    res.send({ success: false, message: "ressource not found" });
                } else {
                    db.collection('todos').deleteOne({ _id : ObjectId(id) }).then((resDelete)=>{
                        res.send({ success: true, message: "todo deleted successfully" });
                    }).catch((errDelete)=>{
                        res.send({ success: false, message: "Something went wrong" });
                    })
                }
    
            }).catch((err) => {
                console.log(err);
                res.send({ success: false, message: "Something went wrong" });
            }); 
        }else{
            res.send({ success: false, message: "param id is required" });
        }

    })
        
}


exports.updateTodo = function (req, res) {

    const MongoClient = require('mongodb').MongoClient;

    MongoClient.connect('mongodb://localhost:27017/').then((con) => {
        const db = con.db('hlitodoapp');
 
        const id = URL.parse(req.url,true).query.id;

        if (id != null) {
            db.collection('todos').find({ _id : ObjectId(id) }).toArray().then((arrayResult)=>{
                if (arrayResult.length === 0) {
                    res.send({ success: false, message: "ressource not found" });
                } else {

                    let chuck = [];
                    req.on('data', (data) => {
                        chuck.push(data);
                    }).on('end', () => {
                        console.log(chuck);
                        const txt = Buffer.concat(chuck).toString();
                        console.log(txt);
                        let jsonBody = JSON.parse(txt);


                        db.collection('todos').updateOne({ _id : ObjectId(id) }, { $set: jsonBody } ).then((resDelete)=>{
                            res.send({ success: true, message: "todo updated successfully" });
                        }).catch((errDelete)=>{
                            res.send({ success: false, message: "Something went wrong" });
                        })
                    })

                    
                }
    
            }).catch((err) => {
                console.log(err);
                res.send({ success: false, message: "Something went wrong" });
            }); 
        }else{
            res.send({ success: false, message: "param id is required" });
        }

    })
        
}