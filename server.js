const dotenv = require('dotenv')
const express = require('express');
const DbPool = require('./config/db');
const app = express()
const PORT = process.env.PORT ;

dotenv.config()

app.use(express.json())

app.use("/api/contact", require("./routes/contactRoutes"));

DbPool.query("SELECT 1").then(() => {
    console.log("DB Connected")
    app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));
}).catch((err) => {
    console.log(err);
});


app.get('/', (req, res) => res.send('Hello World!'))




