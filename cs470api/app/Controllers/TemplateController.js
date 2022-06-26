const dbConnectionPool=require('../../database/mySQLconnect');

class TemplateController{
    constructor(){console.log("Constructor of TemplateController is called.");};
    Templates=async(ctx)=>new Promise((resolve,reject)=>{
        dbConnectionPool.getConnection((err,dbConnection)=>{
            if(err){
                ctx.body=undefined;
                ctx.status=500;
                return reject(err);
            } else {
                dbConnection.query({sql:"SELECT * FROM templates"},
                    (error,results,fields)=>{dbConnection.release();
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
                        console.log(`Couldn't insert to the errors table due to the following query error: ${error}`);
                        console.log(`Couldn't insert the following log to errors table: ${error}`);
                    }
                }
            );
        }
    }));
    Update=async(ctx)=>new Promise((resolve,reject)=>{
        dbConnectionPool.getConnection((err,dbConnection)=>{
            if(err){
                dbConnection.release();
                ctx.body=undefined;
                ctx.status=500;
                return reject(err);
            } else {
                dbConnection.query({
                        sql:'UPDATE templates SET description = ? WHERE name = ?',
                        values:[...ctx.request.body]},
                    (error,results,fields)=>{dbConnection.release();
                        if(error){
                            ctx.body=error;
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
            console.log('An error occurred while connecting to the database: ${err} ');
            console.log('Caused by: ${error}');
        } else {
            dbConnection.query({
                    sql:`INSERT INTO errors (lError, lStatus, lDesc) VALUES (1,${ctx.status},"${error}")`,
                },(err,results,fields)=>{
                    if(err){
                        console.log(`Couldn't insert to the errors table due to the following query error: ${error}`);
                        console.log(`Couldn't insert the following log to errors table: ${error}`);
                    }
                }
            );
        }
    }));
    Create=async(ctx)=>new Promise((resolve,reject)=>{
        dbConnectionPool.getConnection((err,dbConnection)=>{
            if(err){
                dbConnection.release();
                ctx.body=undefined;
                ctx.status=500;
                return reject(err);
            } else {
                dbConnection.query({
                        sql:'INSERT INTO templates VALUES (?, ?)',
                        values:[...ctx.request.body]},
                    (error,results,fields)=>{dbConnection.release();
                        if(error){
                            ctx.body=error;
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
                    values:[ctx.status,error]
                },(err,results,fields)=>{
                    if(err){
                        console.log(`Couldn't insert to the errors table due to the following query error: ${error}`);
                        console.log(`Couldn't insert the following log to errors table: ${error}`);
                    }
                }
            );
        }
    }));
};
module.exports=TemplateController;
