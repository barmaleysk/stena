const crud = require('./crud');
const connect = require('./connect');
const config = require('./config');
var client;
connect.connect(config.url, () => { client = crud.getDB(); });

module.exports.add = function (event_in, msg){
var Event_ = {event: event_in, data: newDate(), info: msg }
crud.insertOne(Event_, "Events", () => { })
}
module.exports.getStatAll = function(callback){crud.findS("Events", (result) => { callback(result) } )}

var newDate = function () { var date = new Date(); return { d: date.getDate(), m: date.getMonth() + 1, y: date.getFullYear() } };