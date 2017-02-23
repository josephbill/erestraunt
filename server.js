//require express
var express = require ('express');
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
//connects server to html and controllers
app.use(express.static(__dirname + '/public'));
//use json data
app.use(bodyparser.json());
//here remember to create mongo db , connector to mongodb
mongoose.connect('mongodb://localhost/erestraunt');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open' , function() {console.log("mongoose connection successful");});
//creating schema for database 
var schema = mongoose.schema;

var erestrauntSchema = new Schema({
      name: String,
      liscence: Number,
      Location: String,
       RestrauntCategory: String,
}, {versionKey: false, collection: 'erestraunt'});



var Restraunt = mongoose.model('Restraunt' , erestrauntschema);
//getting data from  app
app.get('/erestraunt' ,function(req, res){
console.log('I received a get request');
Restraunt.find({} , function(err , docs){
console.log(docs);
res.json(docs);
});
});

//posting data to app

app.post('/erestraunt', function (req, res) {
	console.log(req.body);

		Contact(req.body).save(function (err, data) {
			if (err) {
				console.log(err);
			} else {
				console.log('Saved : ', data ); 
				res.json(data);
			}
		});
});

//deleting data from app

app.delete('/erestraunt/:id', function(req, res){
	var id = req.params.id;
	console.log(id);

	Contact.findByIdAndRemove(id, function(err, data) {
    	if (err){
    		res.send(err);
    	} else {
    		res.json(data);
    	}
	});
});

//getting data / retriving data from app

app.get('/erestraunt/:id', function(req, res){
	var id = req.params.id;
	console.log(id);

	Contact.findById(id, function(err, data) {
    	if (err){
    		res.sw end(err);
    	} else {
    		res.json(data);
    	}
	});
});


//inserting data to app
app.put('/erestraunt/:id', function(req, res) {
	var id = req.params.id;
	console.log(req.body.name);

	Contact.findByIdAndUpdate(id, 
		{ $set: { name: req.body.name, 
			      adm_number: req.body.adm_number,
			      school: req.body.school, 
				  marks: req.body.marks,
				  Amount: req.body.Amount

				}
				}, function (err, doc) {
  		if (err) {
  			res.send(err);
  		} else {
  			res.json(doc);
  		}
	});
});

app.listen(6000);

console.log("Server is Running on port 6000");