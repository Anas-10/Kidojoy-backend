const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const path = require('path');



app.use(cors());
app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); // Adjust the limit as needed



const pool = mysql.createPool({
  host: 'localhost',
  user: 'anas',
  password: 'Anas@1234',
  database: 'kidjoy',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware to provide MySQL pool to all routes
app.use((req, res, next) => {
  req.mysql = pool;
  next();
});

const userRoutes = require('./routes/user');
app.use('/user', userRoutes);
const postRoutes = require('./routes/post');




app.use('/post', postRoutes);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

