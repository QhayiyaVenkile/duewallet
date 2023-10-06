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
    host: "db",
    user: 'root',
    password: 'root123',
    database: 'duewallet'
})

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed", err);
    } else {
        console.log("Connected to Database");
        console.log("Creating database table")
        let tableName = 'users';

        // query to create table users
        let query = `CREATE TABLE ${tableName} 
        (
            "UserID" VARCHAR(36) PRIMARY KEY,
            "UserName" VARCHAR(64) NOT NULL,
            "Email" VARCHAR(254) NOT NULL,
            "Password" VARCHAR(255) NOT NULL,
            "CreatedAt" DATE NOT NULL
        )`;

        db.query(query, (err, rows) => {
            if (err) {
                console.log("Table Exist");
            } else {
                console.log(`Successfully Created Table - ${tableName}`)
            }
        })

        console.log("Creating database table")
        let tableName1 = 'budgets';

        // query to create table budgets
        let query1 = `CREATE TABLE ${tableName1} 
        (
            "BudgetID" VARCHAR(36) PRIMARY KEY,
            "BudgetName" VARCHAR(64) NOT NULL,
            "Allocated" DECIMAL(15, 2) NOT NULL,
            "CreatedAt" DATE NOT NULL
        )`;

        db.query(query1, (err, rows) => {
            if (err) {
                console.log("Table Exist");
            } else {
                console.log(`Successfully Created Table - ${tableName1}`)
            }
        })

        console.log("Creating database table")
        let tableName2 = 'expenses';

        // query to create table expenses
        let query2 = `CREATE TABLE ${tableName2} 
        (
            "ExpenseID" VARCHAR(36) PRIMARY KEY,
            "ExpenseName" VARCHAR(64) NOT NULL,
            "Amount" DECIMAL(15, 2) NOT NULL,
            "CreatedAt" DATE NOT NULL,
            "BudgetID" VARCHAR(36) NOT NULL,
            FOREIGN KEY(BudgetID) REFERENCES budgets(BudgetID)
        )`;

        db.query(query2, (err, rows) => {
            if (err) {
                console.log("Table Exist");
            } else {
                console.log(`Successfully Created Table - ${tableName2}`)
            }
        })
    }
});

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