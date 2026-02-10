const express = require("express")
const dotenv = require("dotenv").config()
const connectDB = require("./config/dbconnection")


connectDB()
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use("/api/transaction", require("./routes/transaction.routes"))
app.use((err, req, res, next) => {
  res.status(res.statusCode || 500).json({
    message: err.message,
  });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} `)
})