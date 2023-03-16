const mongoose = require('mongoose');

const connectionDB = () => {
    console.log('Connecting to database...');


    mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,})
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log(`Error connecting to database ${err}`);
    });
};

module.exports = connectionDB;
