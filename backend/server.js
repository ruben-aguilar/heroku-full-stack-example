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


client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
    client.end();
});

const app = express();


app.get('/api/message', (req, res) => {
    client.connect();

    client.query('SELECT * from messages', (err, messages) => {
        console.log(client);
        console.log('Messages', messages)
        client.end()
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