const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const app = express();

// Body parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config

const db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true,  useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://mongodb:mongodb@mongodb-3e9fg.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });




//passport middleware
app.use(passport.initialize());

//passport Config

require('./config/passport')(passport);


app.get('/', (req, res)=> res.send('Hello World!'));


// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));