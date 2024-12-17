import dotenv from 'dotenv'
import pg from 'pg'

const env = dotenv.config()

if (!env) {
    throw Error(`Could not load environment variables from source`)
}

const client = new pg.Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
})

client.connect()
    .then(console.log(`Database connected 🔥`))
    .catch(err => console.err(`Cannot connect to database 😭`, err))


export async function sql(query, values) {
    const { rows } = await client.query(query, values)
    return rows
}

async function migrate() {
    sql(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `)

    sql(`
        CREATE TABLE IF NOT EXISTS categories (
            id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
            name VARCHAR NOT NULL
        );
    `)

    sql(`
        CREATE TABLE IF NOT EXISTS contacts (
            id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
            name VARCHAR NOT NULL,
            email VARCHAR NOT NULL UNIQUE,
            phone VARCHAR,
            category_id UUID,

            FOREIGN KEY(category_id) REFERENCES categories(ID)
        );
    `)
}

await migrate()
    .then(console.log(`Migrations applied ✅`))
    .catch(console.error)
