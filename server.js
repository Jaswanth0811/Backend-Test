const fastify = require('fastify')({ logger: false });
const fastifyPostgres = require('@fastify/postgres');

const DB_CONNECTION_STRING = 'postgresql://neondb_owner:npg_E0Ri2lcUIpVw@ep-delicate-base-az7dzspl-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

// Register PostgreSQL plugin
fastify.register(fastifyPostgres, {
  connectionString: DB_CONNECTION_STRING
});

// Root route (simple health check)
fastify.get('/', async (request, reply) => {
  return { status: 'OK', service: 'Service Provider API' };
});

// POST /api/register
// Register a new service provider
fastify.post('/api/register', async (request, reply) => {
  const { name, phone, skill, city } = request.body || {};

  if (!name || !phone || !skill || !city) {
    reply.status(400);
    return {
      success: false,
      message: 'Registration failed. Fields "name", "phone", "skill", and "city" are all required.'
    };
  }

  try {
    const query = `
      INSERT INTO service_providers (name, phone, skill, city)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, phone, skill, city, created_at
    `;
    const values = [name, phone, skill, city];
    const { rows } = await fastify.pg.query(query, values);

    reply.status(201);
    return {
      success: true,
      message: 'Service provider registered successfully',
      data: rows[0]
    };
  } catch (error) {
    console.error('Error during registration query:', error);
    reply.status(500);
    return {
      success: false,
      message: 'An error occurred while saving to the database'
    };
  }
});

// GET /api/providers
// Get list of all service providers
fastify.get('/api/providers', async (request, reply) => {
  try {
    const query = 'SELECT id, name, phone, skill, city, created_at FROM service_providers ORDER BY id ASC';
    const { rows } = await fastify.pg.query(query);

    return {
      success: true,
      data: rows
    };
  } catch (error) {
    console.error('Error retrieving providers:', error);
    reply.status(500);
    return {
      success: false,
      message: 'An error occurred while fetching from the database'
    };
  }
});

// GET /api/providers/:id
// Get details of a specific service provider by their ID
fastify.get('/api/providers/:id', async (request, reply) => {
  const { id } = request.params;

  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    reply.status(400);
    return {
      success: false,
      message: 'Invalid provider ID format. ID must be an integer.'
    };
  }

  try {
    const query = 'SELECT id, name, phone, skill, city, created_at FROM service_providers WHERE id = $1';
    const { rows } = await fastify.pg.query(query, [parsedId]);

    if (rows.length === 0) {
      reply.status(404);
      return {
        success: false,
        message: `Service provider with ID ${parsedId} not found`
      };
    }

    return {
      success: true,
      data: rows[0]
    };
  } catch (error) {
    console.error(`Error retrieving provider ${parsedId}:`, error);
    reply.status(500);
    return {
      success: false,
      message: 'An error occurred while querying the database'
    };
  }
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server running on port 3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
