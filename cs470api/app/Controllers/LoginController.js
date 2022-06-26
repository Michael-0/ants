const dbConnectionPool = require('../../database/mySQLconnect');
const setAccessToken = require('../../config/setAccessToken');
require('dotenv').config();
class LoginController{
    constructor(){console.log('Constructor of LoginController is called.');};
    authorizeUser=async(ctx)=>new Promise((resolve,reject)=>{
        dbConnectionPool.getConnection((err,dbConnection)=>{
            if(err){
                ctx.body=undefined;
                ctx.status=500;
                return reject(err);
            } else {
                dbConnection.query({
                        sql:"SELECT `uNumb`, `uName`, `uType`, `eMail`, `pNumb`, `pName`, `fName`, `mName`, `lName`, `pNoun`, `oName` FROM users WHERE `uName` = ? AND `uPass` = SHA2(?,512)",
                        values:[...ctx.request.body]
                    },(error,results,fields)=>{dbConnection.release();
                        if(error){
                            ctx.body=undefined;
                            ctx.status=500;
                            return reject(error);
                        } else if(results.length===1){
                            ctx.body=results[0];
                            ctx.status=200;
                            return resolve();
                        } else {
                            ctx.body=undefined;
                            ctx.status=406;
                            return reject(`User ${ctx.request.body} Not Found`);
                        }
                    }
                );
            }
        });
    }).catch(error=>dbConnectionPool.getConnection((err,dbConnection)=>{
        if(err){
            ctx.body="The Database is offline or unreachable! Logs will be temporarily unavailable!";
            console.log(`An error occurred while connecting to the database: ${err}`);
            console.log(`Caused by: ${error}`);
        } else {
            dbConnection.query({
                sql:`INSERT INTO errors (lError, lStatus, lDesc) VALUES (1,${ctx.status},"${error}")`,
                },(err,results,fields)=>{
                    if(err){
                        console.log(`Couldn't insert to the errors table due to the following query error: ${err}`);
                        console.log(`Couldn't insert the following log to errors table: ${error}`);
                    }
                }
            );
        }
    }));
};

module.exports = LoginController;
