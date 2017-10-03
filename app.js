'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');  

app.set('port', (process.env.PORT || 5000));

/*load classes from file*/
const Calculator=require('./calculator.js');

/*create calculator*/
let MyCalculator =new Calculator();


/*serving static files*/
app.use(express.static(path.resolve(__dirname,'./public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/*sends calculator interface*/
app.get('/',(req,res)=>{
	res.sendFile('index.html');
});

app.post('/calculate',(req,res)=>{
	/*input expression*/
	let expression = req.body.expression;
	let isError=false;
	
	/*future result of calculation*/
	let result;
	
	try{		
		result=MyCalculator.calculate(expression);		
	}
	catch(e){
		result="Invalid expression";
		isError=true;
	}
	
	const resultData = {
          "result": new String(result),
		  "isError":isError,
          "expression": expression          
    };
	
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(resultData));	
})


app.listen(app.get('port'), (err)=> {
	if(err){
		console.log("Error starting server");
		console.log(err);
		return
	}
	
	console.log("Server listening on port : "+app.get('port'));
});


