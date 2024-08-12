const { config } = require('dotenv');
const mongoose = require('mongoose');

//const uri='mongodb://localhost:27017/mini-ecommerce';

const connectDatabase = () => {
       mongoose.connect(process.env.DB_URL).then((con) => {
           console.log('MongoDb connected to host :'+con.connection.host);
       })
};
 module.exports= connectDatabase;