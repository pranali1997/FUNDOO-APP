const mongoose=require('mongoose');

const LOGIN_SCHEMA=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    mobileNo:{
        type:String
    },
    password:{
        type:String
    },
    isPresent:{
        type:Boolean
    }
},
{
    timeStamp:true
});

const SCHEMA_LOGIN=mongoose.model('registration',LOGIN_SCHEMA);


module.exports={
    create(registerData,callback){
        const LOGIN_DETAILS=new SCHEMA_LOGIN();
        LOGIN_DETAILS.name=registerData.name;
        LOGIN_DETAILS.email=registerData.email;
        LOGIN_DETAILS.mobileNo=registerData.mobileNo;
        LOGIN_DETAILS.password=registerData.password;
        LOGIN_DETAILS.isPresent=registerData.isPresent;

        LOGIN_DETAILS.save()
        .then(data=>{
            console.log("data will be saved as ",data);
            callback(null,data)
        })
        .catch(err=>{
            callback({
                message:err.message || "problem while storing details in database" 
            });
        });
    },

    findOne(data,callback){
        SCHEMA_LOGIN.findOne(data)
        .then(data=>{
            return callback(null,data);
        })
        .catch(err=>{
            return callback({
                message: err.message || "problem while getting data from database"
            })
        })
    },

    findToken(data,callback){
        LOGIN_DETAILS.find(data)
        .then(data=>{
            return callback(null,data);
        })
        .catch(err=>{
            return callback({
                message: err.message || "problem while getting token value from database"
            })
        })
    }
}