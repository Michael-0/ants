const dbConnectionPool=require('../../database/mySQLconnect');

class TicketController{
    constructor(){console.log("Constructor of TicketController is called.");};
    uNumb=async(ctx)=>new Promise((resolve,reject)=>{
        dbConnectionPool.getConnection((err,dbConnection)=>{
            if(err){
                ctx.body=undefined;
                ctx.status=500;
                return reject(err);
            } else {
                dbConnection.query({
                    sql:"SELECT * FROM tickets WHERE uNumb = ? ORDER BY tNumb",
                    values:[ctx.params.uNumb]
                },(error,results,fields)=>{dbConnection.release();
                    if(error){
                        ctx.body=undefined;
                        ctx.status=500;
                        return reject(error);
                    } else {
                        ctx.body=results;
                        ctx.status=200;
                        return resolve();
                    }
                });
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
                        console.log(`Couldn't insert to the errors table due to the following query error: ${err}`);
                        console.log(`Couldn't insert the following log to errors table: ${error}`);
                    }
                }
            );
        }
    }));
    AdminuNumb=async(ctx)=>new Promise((resolve,reject)=>{
        dbConnectionPool.getConnection((err,dbConnection)=>{
            if(err){
                ctx.body=undefined;
                ctx.status=500;
                return reject(err);
            } else {
                dbConnection.query({
                    sql:"SELECT * FROM tickets WHERE tAgent = ? ORDER BY tNumb",
                    values:[ctx.params.AdminuNumb]
                },(error,results,fields)=>{dbConnection.release();
                    if(error){
                        ctx.body=undefined;
                        ctx.status=500;
                        return reject(error);
                    } else {
                        ctx.body=results;
                        ctx.status=200;
                        return resolve();
                    }
                });
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
                        console.log(`Couldn't insert to the errors table due to the following query error: ${err}`);
                        console.log(`Couldn't insert the following log to errors table: ${error}`);
                    }
                }
            );
        }
    }));
    Ticket=async(ctx)=>new Promise((resolve,reject)=>{
        if(typeof(ctx.params)!="Number"){
            ctx.body=undefined;
            ctx.status=500;
            return reject(`${ctx.params} is not a 'Number'`);
        }
        dbConnectionPool.getConnection((err,dbConnection)=>{
            if(err){
                ctx.body=undefined;
                ctx.status=500;
                return reject(err);
            } else {
                dbConnection.query({
                    sql:"SHOW INDEX FROM tickets WHERE Key_name = 'PRIMARY'",
                    values:[ctx.params.ticketID]
                },(error,results,fields)=>{
                    if(error){
                        dbConnection.release();
                        ctx.body=undefined;
                        ctx.status=500;
                        return reject(error);
                    } else {
                        dbConnection.query({
                            sql:"SELECT * FROM tickets WHERE `tNumb` = ?",
                            values:[results.Column_name]
                        },(error,results,fields)=>{dbConnection.release();
                            if(error){
                                ctx.body=undefined;
                                ctx.status=500;
                                return reject(error);
                            } else {
                                ctx.body=results;
                                ctx.status=200;
                                return resolve();
                            }
                        });
                    }
                });
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
                        console.log(`Couldn't insert to the errors table due to the following query error: ${err}`);
                        console.log(`Couldn't insert the following log to errors table: ${error}`);
                    }
                }
            );
        }
    }));
    Create=async(ctx)=>new Promise((resolve,reject)=>{
        // let values;
        // if (ctx.request.body &&
        //     ctx.request.body?.ticket &&
        //     typeof(ctx.request.body.ticket)==="Object"
        // ){
        //     values=Object.values(ctx.request.body.ticket);
        //     if(values.length<5){
        //         ctx.body=ctx.request.body;
        //         ctx.status=400;
        //         console.log("Fewer inputs than required were detected.");
        //         return reject("Fewer inputs than required were detected.");
        //     } else if (values.length>5){
        //         ctx.body=ctx.request.body;
        //         ctx.status=400;
        //         console.log("More inputs than required were detected.");
        //         return reject("More inputs than required were detected.");
        //     }
        // }
        dbConnectionPool.getConnection((err,dbConnection)=>{
            if(err){
                ctx.body=undefined;
                ctx.status=500;
                return reject(err);
            } else {
                dbConnection.query({
                        sql: "INSERT INTO tickets (`uNumb`,`tCategory`,`tTemplate`,`tAgent`,`tDesc`) VALUES (?,?,?,?,?)",
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
                    values:[ctx.status,error]
                },(err,results,fields)=>{
                    if(err){
                        console.log(`Couldn't insert to the errors table due to the following query error: ${err}`);
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
                        sql:"UPDATE tickets SET tCategory = ?, tTemplate = ?, tDesc = ? WHERE tNumb = ?",
                        values: ctx.request.body},
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
                dbConnection.release();
                ctx.body=undefined;
                ctx.status=500;
                return reject(err);
            } else {
                dbConnection.query({sql:"SHOW FULL COLUMNS FROM tickets"},
                    (error,results,fields)=>{dbConnection.release();
                        if(error){
                            ctx.status=500;
                            ctx.body=undefined;
                            return reject(error);
                        } else {
                            ctx.status=200;
                            ctx.body=results.reduce((p,v,i,a)=>{
                                p.push({
                                    id: v.Field,
                                    required: (v.Null==="NO"),
                                    key: (v.Key==="PRI"),
                                    comment: v.Comment
                                });
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
module.exports=TicketController;
