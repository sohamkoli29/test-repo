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