const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
const knex = require('knex')

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'smart-brain'
    }
  });

// view all user data
//   console.log(db.select('*').from('users').then(data => {
//       console.log(data);
//   }));

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res) => { res.send(database.users);})
app.post('/signin', (req, res) => { signin.handleSignin(req,res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req,res) => { profile.handleProfile(req, res, db)})
app.put('/image', (req,res) => { image.handleImage(req, res, db)})

// // Load hash from your password DB.
// bcrypt.compare("B4c0/\/", hash, function(err, res) {
//     // res === true
// });
// bcrypt.compare("not_bacon", hash, function(err, res) {
//     // res === false
// });

app.listen(3000, () => {
    console.log("app is running on port 3000");
})
