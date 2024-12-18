import { client } from './dbConnect.js'

export async function sql(query, values) {
    const { rows } = await client.query(query, values)
    return rows
}
