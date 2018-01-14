const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('parking_admin','dianatau','',{
	dialect : 'mysql',
	define : {
		timestamps : false
	}
})

const Parking = sequelize.define('parking', {
	city : {
		type : Sequelize.STRING,
		allowNull : false
	},
	adress : {
		type : Sequelize.STRING,
		allowNull : false
	},
	capacity : {
		type : Sequelize.INTEGER,
		allowNull : false
	},
	description : {
		type : Sequelize.STRING,
		allowNull : false
	}
})

const Car = sequelize.define('car', {
	car_no : {
		type : Sequelize.STRING,
		allowNull : false
	},
	time : {
		type : Sequelize.STRING
	},
	
})

Parking.hasMany(Car)


const app = express()
app.use(bodyParser.json())
app.use(express.static('./parking_admin/build'))
app.use(function(req,res,next)
{
	res.header("Access-Control-Allow-Origin","*")
	res.header("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type")
	res.header("Access-Control-Allow-Methods","GET,POST,OPTIONS,PUT,DELETE,HEAD,PATCH");

	next()
})

app.get('/create', (req, res) => {
	sequelize.sync({force : true})
		.then(() => res.status(201).send('recreated all tables'))
		.catch(() => res.status(500).send('hm, that was unexpected...'))	
})

app.get('/ping',(req,res)=>{
	console.warn('nuuuuuu')
	res.status(200).json({message: 'pong'})
})

app.get('/parkings', (req, res) => {
	Parking.findAll()
		.then((results) => {
			res.status(200).json(results)
		})
		.catch(() => res.status(500).send('hm, that was unexpected...'))			
})

app.post('/parkings', (req, res) => {
	Parking.create(req.body)
		.then(() => {
			res.status(201).send('created')
		})
		.catch(() => res.status(500).send('hm, that was unexpected...'))
})

app.get('/parkings/:id', (req, res) => {
	Parking.findById(req.params.id)
		.then((result) => {
			if (result){
				res.status(200).json(result)
			}
			else{
				res.status(404).send('not found')	
			}
		})
		.catch(() => res.status(500).send('hm, that was unexpected...'))
})

app.put('/parkings/:id', (req, res) => {
	Parking.findById(req.params.id)
		.then((result) => {
			if (result){
				return result.update(req.body)
			}
			else{
				res.status(404).send('not found')	
			}
		})
		.then(() => {
			res.status(201).send('modified')
		})
		.catch(() => res.status(500).send('hm, that was unexpected...'))
})

app.delete('/parkings/:id', (req, res) => {
	Parking.findById(req.params.id)
		.then((result) => {
			if (result){
				return result.destroy()
			}
			else{
				res.status(404).send('not found')	
			}
		})
		.then(() => {
			res.status(201).send('removed')
		})
		.catch(() => res.status(500).send('hm, that was unexpected...'))
})

app.get('/parkings/:bid/cars', (req, res) => {
	Parking.findById(req.params.bid)
		.then((result) => {
			if (result){
				return result.getCars()
			}
			else{
				res.status(404).send('not found')	
			}
		})
		.then((results) => {
			res.status(200).json(results)
		})
		.catch(() => res.status(500).send('hm, that was unexpected...'))
})

app.get('/parkings/:bid/cars/:cid', (req, res) => {
	Parking.findById(req.params.bid)
		.then((result) => {
			if (result){
				return result.getCars({where : {id : req.params.cid}})
			}
			else{
				res.status(404).send('not found')	
			}
		})
		.then((result) => {
			if (result){
				res.status(200).json(result)
			}
			else{
				res.status(404).send('not found')	
			}
		})
		.catch(() => res.status(500).send('hm, that was unexpected...'))	
})
app.post('/cars', function(request, response) {
    Car.create(request.body).then(function(CarDetails) {
        response.status(201).send(CarDetails)
    })
})
app.post('/parkings/:bid/cars', (req, res) => {
	Parking.findById(req.params.bid)
		.then((result) => {
			if (result){
				let chapter = req.body
				chapter.parking_id = result.id
				return Car.create(chapter)
			}
			else{
				res.status(404).send('not found')	
			}
		})
		.then(() => {
			res.status(201).json('created')
		})
		.catch(() => res.status(500).send('hm, that was unexpected...'))
})

app.put('/parkings/:bid/cars/:cid', (req, res) => {
	Car.findById(req.params.cid)
		.then((result) => {
			if (result){
				return result.update(req.body)
			}
			else{
				res.status(404).send('not found')	
			}
		})
		.then(() => {
			res.status(201).send('modified')
		})
		.catch(() => res.status(500).send('hm, that was unexpected...'))
})

app.delete('/parkings/:bid/cars/:cid', (req, res) => {
	Car.findById(req.params.cid)
		.then((result) => {
			if (result){
				return result.destroy()
			}
			else{
				res.status(404).send('not found')	
			}
		})
		.then(() => {
			res.status(201).send('removed')
		})
		.catch(() => res.status(500).send('hm, that was unexpected...'))
})

app.listen(8080)