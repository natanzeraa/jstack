import ContactRepository from "../repositories/ContactRepository.js"

class ContactController {
    async index(request, response) {
        // Lista todos os registros
        const contacts = await ContactRepository.findAll()
        response.json(contacts)
    }

    async show(request, response) {
        // Lista um registro
        const { id } = request.params

        const contact = await ContactRepository.findById(id)

        if (!contact)
            return response.json(404, { error: 'Contact not found' })

        return response.json(contact)
    }

    store() {
        // Criar novo registro
    }

    update() {
        // Editar um registro
    }

    async delete(request, response) {
        // Deletar um registro
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

