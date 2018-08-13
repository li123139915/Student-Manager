const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://127.0.0.1:27017';

// Database Name
const dbName = 'test';

module.exports = {
    find(collectionName, obj, callback) {
        // Use connect method to connect to the server
        MongoClient.connect(url, function (err, client) {

            const db = client.db(dbName);

            db.collection(collectionName).find(obj).toArray((err, res) => {
                if (err) throw err;
                client.close();
                callback(res);
            })
        });
    },
    insert(collectionName, obj, callback) {
        // Use connect method to connect to the server
        MongoClient.connect(url, function (err, client) {

            const db = client.db(dbName);

            db.collection(collectionName).insertOne(obj,(err, res) => {
                if (err) throw err;
                client.close();
                callback(res);
            })
        });S
    },
    tips(res,message,url){
        res.send(`<script>alert('${message}');window.location='${url}';</script>`)
    }
}