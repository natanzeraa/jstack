import ContactRepository from "../repositories/ContactRepository.js"

class ContactController {
    async index(request, response) {
        // Lista todos os registros
        const contacts = await ContactRepository.findAll()
        response.json(contacts)
    }

    show() {
        // Lista um registro
    }

    store() {
        // Criar novo registro
    }

    update() {
        // Editar um registro
    }

    delete() {
        // Deletar um registro
    }
}

// Singleton
export default new ContactController()

