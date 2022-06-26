const dbConnectionPool=require('../../database/mySQLconnect');

class AdminController{
    constructor(){console.log("Constructor of AdminController is called.");};
    Requests=async(ctx)=>new Promise((resolve,reject)=>{
        dbConnectionPool.getConnection((err,dbConnection)=>{
            if(err){
                ctx.body=undefined;
                ctx.status=500;
                return reject(err);
            } else {
                dbConnection.query({
                        sql:"SELECT uName, eMail, pNumb, pName, fName, mName, lName, pNoun, oName, uPict FROM users WHERE uType = 'pending' ORDER BY uNumb",
                    },(error,results)=>{dbConnection.release();
                        if (error){
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
    Accept=async(ctx)=>new Promise((resolve,reject)=>{
        if(typeof(ctx.request.body)!="Number"){
            ctx.body=undefined;
            ctx.status=500;
            return reject(`Unrecognized Input: ${ctx.request.body}`);
        }
        dbConnectionPool.getConnection((err,dbConnection)=>{
            if(err){
                ctx.body=undefined;
                ctx.status=500;
                return reject(err);
            } else {
                dbConnection.query({sql:"UPDATE users SET uType = 'admin' WHERE uNumb = ? AND uType = 'pending'",values:ctx.request.body},
                    (error,results)=>{dbConnection.release();
                        if (error){
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
    Reject=async(ctx)=>new Promise((resolve,reject)=>{
        if(typeof(ctx.request.body)!="Number"){
            ctx.body=undefined;
            ctx.status=500;
            return reject(`${ctx.request.body} is not a 'Number'`);
        }
        dbConnectionPool.getConnection((err,dbConnection)=>{
            if(err){
                ctx.body=undefined;
                ctx.status=500;
                return reject(err);
            } else {
                dbConnection.query({sql:"UPDATE users SET uType = 'user' WHERE uNumb = ? AND uType = 'pending'",values:ctx.request.body},
                    (error,results)=>{dbConnection.release();
                        if (error){
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
};
module.exports=AdminController;
