const db = require('./config/db');

async function testDB() {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('✅ Database connection successful:', rows[0].result); // Should log: 2
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
}

testDB();
