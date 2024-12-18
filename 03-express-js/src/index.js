import express from 'express'
import Migration from './database/migration.js'
import router from './routes.js'

const app = express()

const database = new Migration()
database.migrateUp()

app.use(express.json())
app.use(router)

app.listen(3000, () => console.log('🔥 Server started at http://localhost:3000'))
