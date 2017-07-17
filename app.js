'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

//CORS
app.use(cors())
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())

app.get('/:date', function(req,res){
	let dateNatural
	let dateUnix
	if(isNaN(req.params.date)){
		dateNatural = new Date(req.params.date)
		dateNatural = dateNatural.toLocaleDateString('en-us', {year:'numeric',month: 'long',day: 'numeric'})
		dateUnix = new Date(req.params.date).getTime()/1000
	}
	else{
		dateUnix = req.params.date
		dateNatural = new Date(req.params.date * 1000)
		dateNatural = dateNatural.toLocaleDateString('en-us', {year:'numeric',month: 'long',day: 'numeric'})
	}
	

	res.json({unix:parseInt(dateUnix), natural: dateNatural})
})

app.listen(port, function(){
	console.log('Server is running on port: '+port)
})