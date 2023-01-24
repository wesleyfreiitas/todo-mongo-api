const mongoose = require("mongoose")

//O retorno dessa função é uma promisse
const connectDB = (url) => {
    return mongoose.connect(url)
}

module.exports = connectDB