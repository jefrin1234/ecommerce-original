require('dotenv').config()
const express  = require('express')
const cors = require('cors')
var cookieParser = require('cookie-parser')

const mongoose = require('mongoose');

const router = require('./routes/index')

const app = express()
app.use(cors({
  origin: true,
  credentials : true
}))
app.use(express.json())

app.use(cookieParser())

app.use('/api',router)




const PORT = 8080 || process.env.PORT


 
   app.listen(PORT,()=>{
    console.log('server running on port 8080')
   })
   
main().then(()=>console.log('connected')).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
    // Optionally, handle this error gracefully, such as retrying the connection or exiting the application.
}


