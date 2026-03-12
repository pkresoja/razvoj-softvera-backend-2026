import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { ToyRoute } from './routes/toy.route'
import { AppDataSource } from './db'
import { FavouriteRoute } from './routes/favourite.route'
import { UserRoute } from './routes/user.route'
import { UserService } from './services/user.service'

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.json({
        hi: 'Hi'
    })
})

app.use(UserService.authenticateToken)
app.use('/api/toy', ToyRoute)
app.use('/api/user', UserRoute)
app.use('/api/favourite', FavouriteRoute)

AppDataSource.initialize()
    .then(() => {
        console.log('Connected to database')
        const port = 3000
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`)
        })
    })