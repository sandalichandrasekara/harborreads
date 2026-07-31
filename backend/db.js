const mongoose = require('mongoose');
require('dotenv').config();

const uri = 'example';

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


// const { MongoClient } = require('mongodb');

// let dbConnection;
// let uri = 'example';

// module.exports = {
//     connectToDb: (cb) => {
//         MongoClient.connect(uri)
//           .then((client) => {
//             dbConnection = client.db();
//             // Pass the dbConnection to the callback
//             return cb(null, dbConnection);
//           })
//           .catch(err => {
//             console.log(err);
//             return cb(err);
//           });
//     },
//     getDb: () => dbConnection
// };
