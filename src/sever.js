require('dotenv').config();
const express =require('express');
const configViewEngine = require('./config/viewEngine');
const connection = require('./config/database');

const app = express();
const port = process.env.PORT || 8081;
const hostname=process.env.HOST_NAME;
const webRouter = require('./routes/web');

//config req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//config template engine
configViewEngine(app);

//khai bao router
app.use('/',webRouter);


app.listen(port,hostname,()=>{
    console.log(`connect loccalhost::${port}`);
})