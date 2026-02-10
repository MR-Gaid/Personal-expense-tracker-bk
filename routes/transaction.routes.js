const router = require("express").Router()

const { getTransactions,
     createTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction,
    getSummary
    } = require("../controllers/transaction.controller")

router.route("/")
    .get(getTransactions)
    .post(createTransaction);

router.route("/summary")
    .get(getSummary);

router.route("/:id")
    .get(getTransaction)
    .put(updateTransaction)
    .delete(deleteTransaction);

module.exports = router