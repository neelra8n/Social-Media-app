const express = require('express');
var mongoose = require('mongoose');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const app = express();

// var MongoClient = require('mongodb').MongoClient;


const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true,  useUnifiedTopology: true })
.then(()=> console.log('MongoDB Connected'))
.catch(err => console.log(err));





app.get('/', (req, res) => res.send('Hello!'));


// //use routes
app.use('api/users', users);
app.use('api/profile', profile);
app.use('api/posts', posts);








const port = process.env.port|| 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
