const app = require('./app/index')
require('dotenv').config()

app.listen(process.env.PORT, ()=>{
    console.log(`App running on http://localhost:${process.env.PORT}`);
})