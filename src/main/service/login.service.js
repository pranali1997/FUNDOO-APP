const LOGIN_MODEL=require('../module/login.model');

module.exports={
    create(registerData,callback){
        LOGIN_MODEL.create(registerData,function(err,data){
            if(err){
                return callback(err);
            }
            return callback(null,data);
        });
    },
    findOne(registerData,callback){
        LOGIN_MODEL.findOne(registerData,function(err,data){
            if(err){
                return callback(err)
            }
            return callback(null,data);
        })
    },
    findToken(registerData,callback){
        LOGIN_MODEL.findToken(registerData,function(err,data){
            if(err){
                return callback(err)
            }
            return callback(null,data);
        })
    },

    findOneId(registerData,callback){
        LOGIN_MODEL.findOneId(registerData,function(err,data){
            if(err){
                return callback(err);
            }
            return callback(null,data);
        })
    }
}