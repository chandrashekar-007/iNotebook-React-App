const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
connectToMongo();

const app = express();
const port = 5000

//using the middleware for using req.body
app.use(express.json())
app.use(cors())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.get('/api/', (req, res) => {
//   res.send('Hello this is api end point')
// })
// app.get('/api/v1/', (req, res) => {
//   res.send('Hello this is version 1 endpoint')
// })

app.listen(port, () => {
  console.log(`iNotebook app listening at http://localhost:${port}`)
})
