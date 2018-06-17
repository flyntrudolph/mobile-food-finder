/////////EXPRESS SERVER SET UP////////////

//Variables to Require all dependencies and invoke as fucntions
let express = require('express')
let morgan = require('morgan')
let bodyParser = require('body-parser')
let app = express()

//Set port as variable and console log to check if sever starts and where
let port = process.env.PORT || 3000
let listener = () => {console.log(`Listening in on port ${port}.`)}
app.listen(port, listener)

//Set variable knex to require file knex.js
let knex = require('./knex')

//use body parser and make public files
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(express.static('public'))

//Catch all for bad requests
app.use((req, res, next) => {
  res.status(404).json({error:{message:"404 Not Found"}})
})


//////////////ROUTES//////////////

//Landing page
app.get('/', function(req, res, next) {
  res.send("welcome to the home page")
})

///EATER GET specific truck info on map
app.get('/:truck_id', function(req, res, next) {
  // return knex('trucks')
  //code block to get specific trucks locations from database
});

//Register OWNER
app.post('/owners/owner_signup', (req, res, next) => {
  res.status(200).send("owner sign up")
  //code block to register, and enter the information of a new food Truck into the database.
})

//Logging In OWNER
app.post('/owners/owner_login', (req, res, next) => {
  res.send(200, "post request to authenticate owner logging in")
  //code block to authenticate Owners username and password
})

//Logged In OWNER, DELETE truck from database
app.delete('/trucks/:truck_id', (req, res, next) => {
  res.send(200, "owner delete truck")
    //code block to DELETE truck from database
})


///////////STRETCH///////////
//Logged In OWNER, making change to trucks info
app.patch('/owners/:owners_ID/trucks/:truck_id/', (req, res, next) => {
  res.send(200, "owner edit truck")
  //code block to update a trucks location after hitting Google Maps API. AJAX to check if online
})
/////////STRETCH///////////