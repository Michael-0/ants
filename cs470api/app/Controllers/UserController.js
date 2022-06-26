const dbConnectionPool=require('../../database/mySQLconnect');

class UserController{
    constructor(){console.log("Constructor of UserController is called.");};
    Create=async(ctx)=>new Promise((resolve,reject)=>{
        dbConnectionPool.getConnection((err,dbConnection)=>{
            if(err){
                ctx.body=undefined;
                ctx.status=500;
                return reject(err);
            } else {
                dbConnection.query({
                        sql:`INSERT INTO users (uName, uType, uPass, eMail, pNumb, pName, fName, mName, lName, pNoun, oName) VALUES (?, ?, SHA2(?, 512), ?, ?, ?, ?, ?, ?, ?, ?)`,
                        values:[...ctx.request.body],
                    },(error,results)=>{dbConnection.release();
                        if(error){
                            ctx.body=undefined;
                            ctx.status=500;
                            return reject(error);
                        } else {
                            ctx.body=results;
                            ctx.status=200;
                            return resolve();
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
    Template=async(ctx)=>new Promise((resolve,reject)=>{
        dbConnectionPool.getConnection((err,dbConnection)=>{
            if(err){
                ctx.body=undefined;
                ctx.status=500;
                return reject(err);
            } else {
                dbConnection.query({sql:"SHOW FULL COLUMNS FROM users"},
                    (error,results,fields)=>{dbConnection.release();
                        if(error){
                            ctx.status=500;
                            ctx.body=undefined;
                            return reject(error);
                        } else {
                            ctx.status=200;
                            ctx.body=results.reduce((p,v,i,a)=>{
                                if (v.Key.length===0){
                                    let compSettings=JSON.parse(v.Comment);
                                    compSettings.id=v.Field;
                                    compSettings.required=(v.Null==="NO");
                                    p.push(compSettings);
                                }
                                return p;
                            },[]);
                            return resolve();
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
module.exports=UserController;
