try{
    const app=new(require('koa'))();
    const fs=require('fs');
    require('dotenv').config();// Loads process.env variables (and vars in .env files)
    app.use(require('koa-bodyparser')());
    require('./app/Middleware/CORS.js')(app);
    // Custom error catch for koa-jwt so that we can log the specific error message
    // when attempting to read and parse the access_token
    app.use(async(ctx,next)=>next().catch((err)=>{
        if(err.status===401){
            console.log('index.js: sending 401 to the client.');
            ctx.status=401;
            ctx.body='JWT Token expired. If this was an app in production, you do not want to tell the public why their request was rejected!';
        } else {
            console.log('index.js: one of the modules in the chain fired an exception.');
            console.log(`The error message is ${err}`);
        }
    }));
    require('./config/ANTSroutes.js')(app);// ANTS routes
    console.log(`HTTPS API Server will listen on port ${process.env.API_PORT}`);
    const server=(require('https')).createServer(
        {// make an http/https server by commenting/uncommenting
            key: fs.readFileSync(process.env.SSL_KEY),// only needed for ssl
            cert: fs.readFileSync(process.env.SSL_CRT)// only needed for ssl
        },
        app.callback()// handles requests received
    );
    server.listen(process.env.API_PORT);
}catch(error){const dbConnectionPool=require('./database/mySQLconnect');
    dbConnectionPool.getConnection((err,dbConnection)=>{
        if(err){
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
    });
}
