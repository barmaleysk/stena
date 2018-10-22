const MongoClient = require('mongodb').MongoClient;
const crud = require('./crud');

module.exports.connect = function(url, callback) {
    MongoClient.connect(url, (err, client) => {
        if (err) { console.log(err)} else 
        {console.log('connect to analytics BD done')
        crud.setDB(client); callback();
        }
    });  
}

//drop
//close