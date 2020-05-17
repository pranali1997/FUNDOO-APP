const express=require('express');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

const mongoose=require('mongoose');

const dbConfig=require('./database.config')
mongoose.Promise=global.Promise;

mongoose.connect(dbConfig.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("successfully connected to database");
}).catch(err=>{
    console.log("Can't not able to connect to the database. Existing...");
    process.exit();
})

require('./src/main/routes/login.routes')(app)

app.listen(3000,()=>{
    console.log('server is listening on port 3000....');
});