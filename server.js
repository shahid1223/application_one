const app = require('./app');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const connectToMysql = require('./config/db');

connectToMysql();

app.listen(PORT, () => {
    console.log(`task app running at ${process.env.BASEURL}${PORT}`)
})