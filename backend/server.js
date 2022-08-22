const express = require('express')


// const { Client } = require('pg');

// const client = new Client({
//     // Heroku will populate this environment variable
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

// client.connect();

const app = express()
app.use(express.static('public'));

// Heroku will populate the PORT environment too
const port = process.env.PORT;

app.get('/api/message', (req, res) => {
    res.send('Hello World!')
})

// app.get('/message', (req, res) => {
//     client.query('SELECT * from Messages', (err, messages) => {
//         res.send(messages[0])
//     })
// })



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})