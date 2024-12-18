import { sql } from '../../database/queryBuilder.js'

class ContactRepository {
    async findAll(orderBy = '') {
        const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
        const rows = await sql(`
            SELECT * FROM contacts
            ORDER BY name ${direction};
        `)

        return rows
    }

    async findById(id) {
        const [row] = await sql(`
            SELECT * FROM contacts
            WHERE id = $1
        `, [id])

        return row
    }

    async findByEmail(email) {
        const [row] = await sql(`
            SELECT * FROM contacts
            WHERE email = $1
        `, [email])

        return row
    }

    async delete(id) {
        await sql(`
            DELETE FROM contacts
            WHERE id = $1;
        `, [id])
    }

    async create(newContact) {
        const { name, email, phone, category_id } = newContact

        const [row] = await sql(`
            INSERT INTO contacts (name, email, phone, category_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [name, email, phone, category_id]
        )

        return row
    }

    async update(id, contact) {
        const { name, email, phone, category_id } = contact

        const [row] = await sql(`
            UPDATE contacts
            SET name = $2, email = $3, phone = $4, category_id = $5
            WHERE id = $1
            RETURNING *`,
            [id, name, email, phone, category_id]
        )

        return row
    }
}

export default new ContactRepository()
