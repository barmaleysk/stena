const MongoClient = require('mongodb').MongoClient;
const crud = require('./crud');
const opt = {
    user: "root", pwd: "1215487gh"  
}
module.exports.connect = function(url, callback) {
    MongoClient.connect(url,(err, client) => {
        if (err) { console.log(err)} else 
        {console.log('connect done')
        crud.setDB(client);
        callback();
        }
    });  
}

//drop
//close