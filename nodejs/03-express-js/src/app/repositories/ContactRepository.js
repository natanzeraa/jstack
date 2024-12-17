import { randomUUID } from 'node:crypto'

const contacts = [
    {
        id: randomUUID(),
        name: 'Natan Felipe',
        email: 'natanzeraaaaaa@email.com',
        phone: '45999990000',
        category_id: randomUUID()
    },
    {
        id: randomUUID(),
        name: 'Shaolim dos Porco',
        email: 'shaolim_matador_de_porco@email.com',
        phone: '45999990110',
        category_id: randomUUID()
    },
    {
        id: randomUUID(),
        name: 'Jojo Todynho',
        email: 'jojoooooo@email.com',
        phone: '45999998888',
        category_id: randomUUID()
    }
]

class ContactRepository {
    findAll() {
        return new Promise((resolve) => resolve(contacts))
    }
}

export default new ContactRepository()
