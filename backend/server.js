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

const app = express();

app.get('/api/message', (req, res) => {
    res.send('Hello World!')
})


app.use(express.static("public"))

// Heroku will populate the PORT environment too



// app.get('/message', (req, res) => {
//     client.query('SELECT * from Messages', (err, messages) => {
//         res.send(messages[0])
//     })
// })


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})