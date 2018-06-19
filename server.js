/////////EXPRESS SERVER SET UP////////////

//Variables to Require all dependencies and invoke as fucntions
let express = require('express')
let morgan = require('morgan')
let bodyParser = require('body-parser')
let app = express()

//Set port as variable and console log to check if sever starts and where
let port = process.env.PORT || 3000
let listener = () => {console.log(`Listening in on port ${port}`)}
app.listen(port, listener)

//Set variable knex to require file knex.js
let knex = require('./knex')

//use body parser and make public files
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(express.static('public'))


//////////////ROUTES//////////////

//Create truck in database
app.post('/create_truck', function(req, res, next) {
  let name = req.body.name
  let cuisines = req.body.cuisines
  let veggiefriendly = req.body.veggiefriendly
  let url = req.body.url
  knex('trucks')
    .insert({
      "name": name,
      "cuisine_id": cuisines,
      "veggiefriendly": veggiefriendly,
      "url": url
    })
    .returning('*')
    .then((data) => {
      console.log(data[0]);
      res.json(data[0])
    })
    .catch((err) => {
      next(err)
    })

})
//Register OWNER
app.post('owners/owner_signup', (req, res, next) => {
  let username = req.body.username
  let password = req.body.password
  let email = req.body.email
  knex('owners')
    .insert({
      "username": username, //hashed
      "password": password, //hashed
      "email": email
    })
    .returning('*')
    .then((data) => {
      console.log(data[0]);
      res.json(data[0])
    })
    .catch((err) => {
      next(err)
    })
})

//Logging In OWNER
app.post('/owner_signon', (req, res, next) => {
  let username = req.body.username
  let password = req.body.password
  knex('owners').where({'username': username, 'password': password})
  .returning('*')
  .then((data) => {

    // console.log(typeof data)
    if (Object.values() == data[0][0] && password == data[0][1]) {
      // res.json()
      console.log('u did it');
    } else {
      console.log("u suk");
    }
  })
  .catch((err) => {
    next(err)
  })
  //code block to authenticate Owners username and password
})



///////////STRETCH///////////
//Logged In OWNER, making change to trucks info
app.patch('/owners/:owners_ID/trucks/:truck_id/', (req, res, next) => {
  res.send(200, "owner edit truck")
  //code block to update a trucks location after hitting Google Maps API. AJAX to check if online
})

///EATER GET specific truck info on map
app.get('/:truck_id', function(req, res, next) {
  // return knex('trucks')
  //code block to get specific trucks locations from database
});

//Logged In OWNER, DELETE truck from database
app.delete('/trucks/:truck_id', (req, res, next) => {
  res.send(200, "owner delete truck")
    //code block to DELETE truck from database
})

//Landing page
app.get('/', function(req, res, next) {
  res.send("welcome to the home page")
})
/////////STRETCH///////////

//Catch all for bad requests
app.use((req, res, next) => {
  res.status(404).json({error:{message:"404 Not Found"}})
})
