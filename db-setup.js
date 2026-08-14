const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_E0Ri2lcUIpVw@ep-delicate-base-az7dzspl-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function setupDatabase() {
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    console.log('Connecting to Neon PostgreSQL...');
    await client.connect();
    console.log('Connected successfully. Creating table service_providers if it does not exist...');

    const query = `
      CREATE TABLE IF NOT EXISTS service_providers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        skill VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await client.query(query);
    console.log('Table "service_providers" is ready!');
  } catch (error) {
    console.error('Error setting up the database:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

setupDatabase();
