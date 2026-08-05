const { Client } = require('pg');

const connectionString = 'postgresql://neondb_owner:npg_E0Ri2lcUIpVw@ep-delicate-base-az7dzspl-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function checkDatabase() {
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    await client.connect();
    const { rows } = await client.query('SELECT * FROM service_providers');
    console.log('Database Rows in "service_providers":');
    console.log(JSON.stringify(rows, null, 2));
  } catch (error) {
    console.error('Error querying database:', error);
  } finally {
    await client.end();
  }
}

checkDatabase();
