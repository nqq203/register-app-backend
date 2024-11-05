const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../.env' });

console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
console.log(process.env.DB_NAME);

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function insertUser(username, email, password) {
  const hashedPassword = await hashPassword(password);
  const query = {
    text: 'INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3)',
    values: [username, email, hashedPassword],
  };

  try {
    const res = await pool.query(query);
    console.log(`User added: ${username}`);
  } catch (err) {
    console.error(err.stack);
  }
}

async function main() {
  await insertUser('john_doe', 'john.doe@example.com', 'Abcd@1234');
  await insertUser('jane_doe', 'jane.doe@example.com', 'Abcd@1234');
  await insertUser('user1', 'user1@example.com', 'Abcd@1234');
  await insertUser('user2', 'user2@example.com', 'Abcd@1234');
  await insertUser('user3', 'user3@example.com', 'Abcd@1234');

  await pool.end(); // Close the pool connection after all inserts are done
}

main();
