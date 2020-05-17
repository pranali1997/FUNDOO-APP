const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

module.exports={
    tokenGenerate(userData,callback){

        const SECRET_KEY="itIsASecret";
         login={
             userId:userData.id
         }
         jwt.sign(login,SECRET_KEY,(err,token)=>{
            if(err){
                console.log("error occurred while generating token ",err);
                return callback(err)
            }
            else{
                return callback(null,token)
            }
         });
         
    },

    decodePassword(userData,password,callback){
        bcrypt.compare(userData,password,(err,res)=>{
            if(!res){
                return callback({
                    message: "password is not matching"
                })
            }
            return callback(null,password);
        })
    }
}