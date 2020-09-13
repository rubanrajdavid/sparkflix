const mongoose = require("mongoose");
const mongooseURL = "mongodb://localhost:27017/sfApp";


const mongooseConnection = async () => {
    try {
        await mongoose.connect(mongooseURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        });
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("DB Connection Failed");
    }
};

module.exports = mongooseConnection
