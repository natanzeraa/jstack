import { randomUUID } from 'node:crypto'

let contacts = [
    {
        id: randomUUID(),
        name: 'Natan Felipe',
        email: 'natanzeraaaaaa@email.com',
        phone: '45999990000',
        category_id: randomUUID()
    },
    {
        id: randomUUID(),
        name: 'Shaolim Matador de Porco',
        email: 'shaolim_matador_de_porco@email.com',
        phone: '45999990110',
        category_id: randomUUID()
    },
    {
        id: randomUUID(),
        name: 'Me chama de Lord',
        email: 'loooord@email.com',
        phone: '45999998888',
        category_id: randomUUID()
    }
]

class ContactRepository {
    findAll() {
        return new Promise((resolve) => resolve(contacts))
    }

    findById(id) {
        return new Promise((resolve) =>
            resolve(contacts.find(contact => contact.id === id)))
    }

    delete(id) {
        return new Promise((resolve) => {
            contacts = contacts.filter(contact => contact.id !== id)
            resolve()
        })
    }
}

export default new ContactRepository()
