var express = require('express');
//app variable used to listen for HTTP request & start server
var app = express();

//when to get the info out of the post request (req.body)
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
//app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());

var todos = ['eat','sleep','build a CRUD app', 'play tennis'];

var header = "Calculator";

var first = "Julia";

var dupMsg = "";

app.get('/', function(req,res){
	res.render('home');
});

app.get('/calculator', function(req,res){
	res.render('calculator', 
		{header: header}); 
});

//root route + a callback function - don't do until the user goes to the route
//the callback function gets request & response parameters
/*app.get('/', function(req, res){
	res.render('calculator', 
		{header: header}); //'hello.ejs' is optional since set view engine to be ejs
}); //sending variable to the template*/

app.get('/todos', function(req,res){
	res.render('todo', 
		{todos: todos,
		dupMsg: dupMsg});
});

app.get('/todos/new', function(req,res){
	res.render('newTodo');
});

app.post('/todos/:index', function(req,res){
	var index = req.params.index;
	todos.splice(index,1);
	res.redirect('/todos');
});

/*app.get('/todos/:index/edit', function(req,res){
	var index = req.params.index
	res.render('edit', 
		{todo: todos[index]});
});*/

app.post('/todos', function(req,res){
	var addTodo = req.body.addTodo;
	var dup = false;
	for (var i = 0; i < todos.length; i++){
		if (todos[i].toUpperCase() === addTodo.toUpperCase()){
			dup = true;
			dupMsg = "You entered a duplicate entry!"; 
			break;
		}
	}
	if (!dup){
		dupMsg = "";
		todos.push(req.body.addTodo);
	}
	res.redirect('/todos');
});

app.get('/firstName', function(req,res){
	res.render('first', 
		{firstName: first});
});

app.get('/julia', function(req,res){
	res.send('<h1>Hello Julia!</h1> It\'s a great day to be learning Nodes.js');
});

app.get('/person/:name', function(req, res){
	var name = req.params.name; //all come w/ params
	res.send(`Hi ${name}`);
});

app.get('/login', function(req, res){
	res.render('login');
});

//ok to duplicate with the above name because 1st is a get and the 2nd is a post
app.post('/login', function (req, res){
	//res.send(req.body);
	res.redirect('/welcome');
});

app.get('/welcome', function(req, res){
	res.send('<h1>Logged In!</h1><a href="./">Back to homepage</a>');
});

function notNumbers(num1, num2){
	if (isNaN(num1) || isNaN(num2)){
		return `<h1>Error</h1>Please enter 2 numbers!`;
	}
	return ""
}

app.get('/calculate', (req,res) => {
	var num1 = Number(req.query.num1);
	var num2 = Number(req.query.num2);
	var operator = req.query.operator;
	var message = notNumbers(num1,num2);
	var operSymbol;
	if (message === ""){
		var value;
		if (operator === "add"){
			 value = num1 + num2;
			 operSymbol = "+";
		}
		else if (operator === "subtract"){
			 value = num1 - num2;
			 operSymbol = "-";	
		}
		else if (operator === "divide"){
			 value = num1 / num2;
			 operSymbol = "/";	
		}
		else {
			 value = num1 * num2;
			 operSymbol = "*";	
		}

		message = `<h1>Answer:</h1>${num1} ${operSymbol} ${num2} = ${value}`;
	}
	message += `<br><br><a href="calculator">Back</a>`;
	res.send(message);
});

/*app.get('/add', function(req,res){
	var num1 = Number(req.query.num1);
	var num2 = Number(req.query.num2);
	var message = notNumbers(num1,num2);
	if (message === ""){
		var sum = num1 + num2;
		message = `The sum of ${num1} + ${num2} = ${sum}`;
	}
	res.send(message);
});

app.get('/subtract/:num1/:num2', function(req,res){
	var num1 = Number(req.params.num1);
	var num2 = Number(req.params.num2);
	var message = notNumbers(num1,num2);
	if (message === ""){
		var subtract = num1 - num2;
		message = `The substraction of ${num1} - ${num2} = ${subtract}`;
	}
	res.send(message);
});

app.get('/multiply/:num1/:num2', function(req,res){
	var num1 = Number(req.params.num1);
	var num2 = Number(req.params.num2);
	var product = num1 * num2;
	res.send(`The product of ${num1} * ${num2} = ${product}`);
});

app.get('/divide/:num1/:num2', function(req,res){
	var num1 = Number(req.params.num1);
	var num2 = Number(req.params.num2);
	var divisor = num1 / num2;
	res.send(`The divisor of ${num1} / ${num2} = ${divisor}`);
});*/

//STARTS THE SERVER - ctrl + c to stop the server
//tell application to start a server -- tell app to listen on a port
//go to http://localhost:3000/
app.listen(3000, function(){
	console.log('Running on 3000');
});
