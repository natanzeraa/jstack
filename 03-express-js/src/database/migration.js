import fs from 'node:fs'
import { sql } from './queryBuilder.js'

class Migration {

    async migrateUp() {
        // Returns a list of all migrations inside migrations folders

        const migrationsList = fs.readdirSync('src/database/migrations/', (err, data) => {
            if (err) {
                console.error(err)
                return new Error(`Error while reading migrations`, err)
            }
            return data
        })


        // For each existing migration ordered by its creation date in migrations folder
        // Read and apply the current migration to the database
        migrationsList.forEach(async migration => {

            console.log(`Applying migration ${migrationsList.indexOf(migration) + 1}/${migrationsList.length} - ${migration}`)

            const statement = fs.readFileSync(`src/database/migrations/${migration}`, async (err, data) => {
                if (err) {
                    console.error(err)
                    return new Error(`Error while processing migrations`, err)
                }
                return data
            }).toString()

            await sql(statement)
                .then(console.info())
                .catch(console.error)
        })
    }

}


export default Migration
