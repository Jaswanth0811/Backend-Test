const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_E0Ri2lcUIpVw@ep-delicate-base-az7dzspl-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function testInsert() {
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    await client.connect();
    const query = `
      INSERT INTO service_providers (name, phone, skill, city)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, phone, skill, city, created_at
    `;
    const values = ['Jane Doe', '555-123-4567', 'Plumber', 'Boston'];
    const { rows } = await client.query(query, values);
    console.log('Insert Succeeded! Inserted row:');
    console.log(JSON.stringify(rows[0], null, 2));
  } catch (error) {
    console.error('Insert Failed! Error details:');
    console.error(error);
  } finally {
    await client.end();
  }
}

testInsert();
