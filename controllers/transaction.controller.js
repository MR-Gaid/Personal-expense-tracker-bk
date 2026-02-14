const Transaction = require("../models/transaction.model")
const asyncHandler = require("express-async-handler")

// Get all transaction
// GET api/transaction
// public access
const getTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.findAll()

    if(transactions.length === 0) {
        return res.status(200).json({ message: "Transactions are empty", data: [] })
    }
    res.status(200).json(transactions)
})

// Create a transaction
// POST api/transaction
// public access
const createTransaction = asyncHandler(async (req, res) => {
    const {title, amount, type, category} = req.body

    if(!title || !amount || !type || !category) {
        res.status(400)
        throw new Error("All fields are required")
    }
    const transaction = await Transaction.create(
       {
         title,
        amount,
        type,
        category
       }
    )
    res.status(201).json(transaction)
})

// Get transaction by id
// GET api/transaction/:id
// public access
const getTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findByPk(req.params.id)
    if(!transaction) {
        res.status(404)
        throw new Error("Transaction not found")
    }
    res.status(200).json(transaction)
})

// Update transaction
// PUT api/transaction/:id
// public access
const updateTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findByPk(req.params.id)

    if(!transaction){
        res.status(404)
        throw new Error("Transaction not found")
    }

const updatedTransaction = await Transaction.update(
        req.body,
        {
            where: {id: req.params.id}
        }
    )
    res.status(200).json(updatedTransaction)
})

// Delete transaction
// DELETE api/transaction/:id
// public access
const deleteTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findByPk(req.params.id)

    if(!transaction){
        res.status(404)
        throw new Error("Transaction not found")
    }

    await transaction.destroy()
    res.status(200).json({message: `${transaction.title} Transaction deleted successfully`})
})

const getSummary = asyncHandler(async (req, res) => {
    const transactions = await Transaction.findAll()

    const income = transactions
        .filter(t => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0)

    const expense = transactions
        .filter(t => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0)

    res.status(200).json({
        totalIncome: income,
        totalExpense: expense,
        balance: income - expense
    })
})


module.exports = {
    getTransactions,
    createTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction,
    getSummary
}