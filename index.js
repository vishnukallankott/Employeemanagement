const express= require('express')
const dotenv=require('dotenv')
const path=require('path')
const { RoutesLoader } = require('expressjs.routes.autoload');
const dbConfig=require('./config/dbConnection')
dotenv.config()
const app=express()
dbConfig()
app.use(express.json())
app.set('port',process.env.port)
app.set('host',process.env.host)
app.use(RoutesLoader(path.join(__dirname, '/routes'), true));
app.listen(app.get('port'),()=>{
    console.log(' app is running at the port number',app.get('port'));
})
