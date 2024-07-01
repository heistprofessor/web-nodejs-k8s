const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection details
const pool = new Pool({
    user: process.env.PGUSER || 'username',
    host: process.env.PGHOST || 'rds_endpoint',
    database: process.env.PGDATABASE || 'database',
    password: process.env.PGPASSWORD || 'password',
    port: process.env.PGPORT || 5432,
});

app.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        res.json(result.rows);
        client.release();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to the database');
    }
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
