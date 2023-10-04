// express imports
const express = require("express");
const bodyParser = require("body-parser");

// mysql imports
const mysql = require("mysql");

// cors imports
const cors = require("cors");

// UUID imports
const crypto = require("crypto");

// encrypt password imports
const bcrypt = require("bcrypt");

const app = express()
app.use(bodyParser.json());
app.use(cors())

// mySQL API connection
const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'duewallet'
})

// insert into table users
app.post('/users', async (req, res) => {
    const { userName, email, password } = req.body;
    
    try {
        const userId = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query(
            'INSERT INTO users (UserID, UserName, Email, Password, CreatedAt) VALUES (?, ?, ?, ?, NOW())',
            [userId, userName, email, hashedPassword]
        );
    
        res.json({ success: true, message: "User registered successfully" });
        }
    catch (error) {
        console.error("Error during user registration:", error.message);
        res.status(500).json({ success: false, message: "Error during user registration" });
    }
})

// insert into table budgets
app.post('/budgets', async (req, res) => {
    const { name, amount } = req.body;
    
    try {
        const budgetId = crypto.randomUUID();

        const result = await db.query(
            'INSERT INTO budgets (BudgetID, BudgetName, Allocated, CreatedAt) VALUES (?, ?, ?, NOW())',
            [budgetId, name, amount]
        );
    
        res.json({ success: true, message: "Budget created successfully" });
        }
    catch (error) {
        console.error("Error during budget creation:", error.message);
        res.status(500).json({ success: false, message: "Error during budget creation" });
    }
})

// insert into table expenses
app.post('/expenses', async (req, res) => {
    const { name, amount, budgetId } = req.body;
    
    try {
        const expenseId = crypto.randomUUID();

        const result = await db.query(
            'INSERT INTO expenses (ExpenseID, ExpenseName, Amount, CreatedAt, BudgetID) VALUES (?, ?, ?, NOW(), ?)',
            [expenseId, name, amount, budgetId]
        );
    
        res.json({ success: true, message: "Expense created successfully" });
        }
    catch (error) {
        console.error("Error during expense creation:", error.message);
        res.status(500).json({ success: false, message: "Error during expense creation" });
    }
})

// create localhost
app.listen(8081, () => {
    console.log("Server is running on http://localhost:8081");
})