const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const connect = mongoose.connect(process.env.MONGODB)
        console.log("Database Connected", (await connect).Collection.name)

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB
