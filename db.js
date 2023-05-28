const mongoose = require('mongoose')
const mongoUrl = "mongodb://localhost:27017/blog"


const mongotoDb = async () => {
    try {
        mongoose.connect(mongoUrl)
            .then(() => {
                console.log("DB CONNETED")
            })
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = mongotoDb