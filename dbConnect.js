const mongoose = require('mongoose');

const connectToDatabase = async () => { 
    try {
        const dbConnection = await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME} `);
        console.log(`Connected to the MongoDb database! DB HOST: ${dbConnection.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to the database: ${error.message}`);
    }
};

module.exports = connectToDatabase;