var client;
module.exports = {
    setDB(_client) { client = _client },
    getDB(){return client},
    insertOne(item,collection, res)  { client.collection(collection).insertOne(item, (err, result) => {if(err) res(err)}); },
    insertMany(item,collection, res) { client.collection(collection).insertMany(item, (err, result) => {if(!err) res()}); },
    findS(collection,res,err) { client.collection(collection).find().toArray(function (err, results) { if (!err) res(results);  })},
    findLimit(collection,nat,lim,res) { client.collection(collection).find().sort({$natural: nat}).limit(lim).toArray(function (err, results) { if (!err) res(results) })},
    find(item,collection, res) { client.collection(collection).find(item).toArray(function (err, results) { if (!err) res(results) })},
    findOne(item,collection, res) { client.collection(collection).findOne(item, function (err, results) { if (!err) res(results) })},
    deleteMany(item,collection, res) { client.collection(collection).deleteMany(item, function (err, results) { if (!err) res(results) })},
    deleteOne(item,collection,res) { client.collection(collection).deleteOne(item).sort({$natural: -1 }, (err, results) => { if (!err) res(results) })},
    deleteOneToEnd(item,collection,res) { client.collection(collection).deleteOne(item, function (err, results) { if (!err) res(results); if (err) console.log("error in deleteOneToEnd") })},
    findOneAndDelete(item,collection,res) { client.collection(collection).findOneAndDelete(item, function (err, results) { if (!err) res(results) })},
    updateOne(item,collection, res) { client.collection(collection).updateOne(item, function (err, results) { if (!err) res(results) })},
    updateMany(item,collection, res) { client.collection(collection).updateMany(item, function (err, results){ if (!err) res(results) })},
    findOneAndUpdate(item,item1,collection,res) {client.collection(collection).findOneAndUpdate(item,item1, function (err, results) { if (!err) res(results) })}
}