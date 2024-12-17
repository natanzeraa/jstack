import ContactRepository from '../repositories/ContactRepository.js'

class ContactController {
    async index(request, response) {
        const contacts = await ContactRepository.findAll()
        response.json(contacts)
    }

    async show(request, response) {
        const { id } = request.params

        const contact = await ContactRepository.findById(id)

        if (!contact)
            return response.json(404, { error: 'Contact not found' })

        return response.json(contact)
    }

    async store(request, response) {
        const { name, email, phone, category_id } = request.body
        const contactExists = await ContactRepository.findByEmail(email)

        if (contactExists)
            return response.status(400).json({ error: 'Email is already in use' })

        const newContact = await ContactRepository.create({
            name, email, phone, category_id
        })

        return response.status(201).json(newContact)
    }

    async update(request, response) {
        const { id } = request.params
        const {
            name, email, phone, category_id
        } = request.body

        const contactExists = await ContactRepository.findById(id)

        if (!contactExists)
            return response.status(404).json({ error: 'Contact not found' })

        const contactExistsByEmail = await ContactRepository.findByEmail(email)

        if (contactExistsByEmail && contactExistsByEmail.id !== id)
            return response.status(400).json({ error: 'Email is already in use' })

        const updatedContact = await ContactRepository.update(id, {
            name, email, phone, category_id
        })

        return response.status(200).json(updatedContact)
    }

    async delete(request, response) {
        const { id } = request.params

        const contact = await ContactRepository.findById(id)

        if (!contact)
            return response.json(404, { error: 'Contact not found' })

        await ContactRepository.delete(id)

        return response.sendStatus(204)
    }
}

// Singleton
export default new ContactController()

