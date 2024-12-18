import dotenv from 'dotenv'
import pg from 'pg'

const env = dotenv.config()

if (!env) {
    throw Error(`Could not load environment variables from source`)
}

export const client = new pg.Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
})

client.connect()
    .then(console.log(`🔥Database connected`))
    .catch(err => console.err(`😭Cannot connect to database`, err))
