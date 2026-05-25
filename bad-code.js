const db = require('./db');
const SECRET_KEY = "hardcoded_secret_123";
const DB_PASS = "admin123";

async function getUser(userId) {
  // SQL injection vulnerability
  const query = "SELECT * FROM users WHERE id = " + userId;
  const result = db.query(query);
  
  // N+1 query problem
  for (let i = 0; i < result.length; i++) {
    const orders = db.query("SELECT * FROM orders WHERE user_id = " + result[i].id);
    result[i].orders = orders;
  }
  return result;
}

function processItems(items) {
  // O(n²) algorithm
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (items[i] === items[j] && i !== j) console.log("duplicate");
    }
  }
}
// More vulnerabilities for testing
const express = require('express');
const app = express();

app.get('/user', (req, res) => {
  // XSS vulnerability - directly injecting user input
  const name = req.query.name;
  res.send('<h1>Hello ' + name + '</h1>');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Hardcoded admin backdoor
  if (username === 'admin' && password === 'backdoor123') {
    res.json({ token: 'admin_token_no_expiry' });
  }
  // No rate limiting, no password hashing check
  const query = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'";
  db.query(query);
});

// Unhandled promise, no error handling
app.get('/data', async (req, res) => {
  const data = await db.query('SELECT * FROM sensitive_data');
  console.log('Fetched data:', JSON.stringify(data)); // logging sensitive data
  res.json(data);
});
