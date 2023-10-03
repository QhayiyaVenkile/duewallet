// // express imports
// const express = require("express");
// const bodyParser = require("body-parser");

// // mysql imports
// const mysql = require("mysql");

// // cors imports
// const cors = require("cors");

// // UUID imports
// const crypto = require("crypto");

// // encrypt password imports
// const bcrypt = require("bcrypt");

// const app = express()
// app.use(bodyParser.json());
// app.use(cors())

// // mySQL API connection
// const db = mysql.createConnection({
//     host: "localhost",
//     user: 'root',
//     password: '',
//     database: 'duewallet'
// })

// app.post('/users', async (req, res) => {
//     const { userName, email, password } = req.body;
    
//     try {
//         const userId = crypto.randomUUID();
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const result = await db.query(
//             'INSERT INTO users (UserID, UserName, Email, Password, CreatedAt) VALUES (?, ?, ?, ?, NOW())',
//             [userId, userName, email, hashedPassword]
//         );
    
//         res.json({ success: true, message: "User registered successfully" });
//         }
//     catch (error) {
//         console.error("Error during user registration:", error.message);
//         res.status(500).json({ success: false, message: "Error during user registration" });
//       }
// })

// // create localhost
// app.listen(8081, () => {
//     console.log("Server is running on http://localhost:8081");
// })