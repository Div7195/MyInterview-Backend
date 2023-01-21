import express from 'express'
import dbConnection from './Database/db.js';
import Router from './routes/route.js'
import cors from 'cors';
import bodyParser from 'body-parser'
const app = express();

app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use('/',Router);

const PORT=8000;
app.listen(PORT,()=>{
    console.log(`Server running successfully on PORT ${PORT}`);
})
dbConnection();