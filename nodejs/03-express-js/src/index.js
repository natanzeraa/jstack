import express from 'express'

const app = express()

app.get('/', (request, response) => {
    response.json({ message: "Opaaaaa bão? uaii" })
})

app.listen(3000, () => console.log('🔥 Server started at http://localhost:3000'))