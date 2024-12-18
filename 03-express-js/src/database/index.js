import dotenv from 'dotenv'
import fs from 'node:fs'
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
    .then(console.log(`🔥Database connected`))
    .catch(err => console.err(`😭Cannot connect to database`, err))


const migrations = fs.readFileSync('src/database/schema.sql', (err, data) => {
    if (err) {
        console.error(err)
        return new Error(`Error while processing migrations`, err)
    }
    return data
})

export async function sql(query, values) {
    const { rows } = await client.query(query, values)
    return rows
}

async function migrate(statement) {
    await sql(`${statement}`)
}

await migrate(migrations.toString())
    .then(console.log(`🏗️ Applying migrations . . .\n\n${migrations.toString()}`))
    .catch(console.error)
    .finally(console.log(`🔥 Migrations applied successfully`))
