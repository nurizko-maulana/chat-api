const port = process.env.PORT || 3002
const express = require('express')
const messageRouter = require('./controllers/messages_controller')

const app = express()

app.use(express.json())

app.get('/', (req, res, next) => res.send(`Server is running on port ${port}`));

app.use('/message', messageRouter)


app.listen(port, () => { console.log(`Server is running on port ${port}`) })
