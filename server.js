const express = require("express")
const dotenv = require("dotenv").config()
const { connectDB, sequelize } = require("./config/dbconnection")
const errorHandler = require("./middlewares/error.middleware")


connectDB()
const app = express()

app.use(express.json())

app.use("/api/transaction", require("./routes/transaction.routes"))

app.use((err, req, res, next) => {
  res.status(res.statusCode || 500).json({
    message: err.message,
  });
});


app.use(errorHandler)

sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced successfully.")
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} `)
})