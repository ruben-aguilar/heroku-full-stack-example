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

const app = express();


app.get('/api/message', (req, res) => {
    client.connect();

    client.query('SELECT * from messages', (err, messages) => {
        console.log('Result messages', messages)
        res.send(messages.rows[0].message)
        client.end()
    })
})


app.use(express.static(path.join(__dirname, 'build')))


// Heroku will populate the PORT environment too
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})