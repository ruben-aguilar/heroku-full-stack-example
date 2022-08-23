const express = require('express')
const path = require('path')


const { Client } = require('pg');

const client = new Client({
    // Heroku will populate this environment variable
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// client.connect();

const app = express();


app.get('/api/message', (req, res) => {
    client.query('SELECT * from messages', (err, messages) => {
        res.send(messages[0].message)
    })
})


console.log(`Serving data from ${path.join(__dirname, 'build')}`)

app.use(express.static(path.join(__dirname, 'build')))


// Heroku will populate the PORT environment too
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})