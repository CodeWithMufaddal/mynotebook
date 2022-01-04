const connectToMongo = require('./db.js');
const express = require('express')
const port = process.env.PORT || 5500
const app = express()

connectToMongo()
app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))




app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})