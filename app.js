'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const querystring = require('querystring');  
const PORT=3030;

/*load classes from file*/
const Calculator=require('./calculator.js');

/*create calculator*/
let MyCalculator =new Calculator();


/*serving static files*/
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));


/*sends calculator interface*/
app.get('/',(req,res)=>{
	res.sendFile('index.html');
});

app.post('/calculate',(req,res)=>{
	/*input expression*/
	let expression = req.body.expression;
	
	/*future result of calculation*/
	let result;
	
	try{		
		result=MyCalculator.calculate(expression);		
	}
	catch(e){
		//console.log(e)
		result=e;
	}
	
	const query = querystring.stringify({
          "result": result,
          "expression": expression          
    });
	  
	res.redirect('/?' + query);	
})


app.listen(PORT,(err)=>{
	if(err){
		console.log("Error starting server");
		console.log(err);
		return
	}
	
	console.log("Server listening on port : "+PORT);
});


