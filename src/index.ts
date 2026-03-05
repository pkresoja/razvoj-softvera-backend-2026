import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { ToyRoute } from './routes/toy.route'

const app = express()
app.use(cors())
app.use(morgan('combined'))

app.get('/', (req, res) => {
    res.json({
        hi: 'Hi'
    })
})

app.use('/api/toy', ToyRoute)

const port = 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})