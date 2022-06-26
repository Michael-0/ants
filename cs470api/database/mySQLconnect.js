const dbConnectionPool=(require('mysql')).createPool({
    //debug: true,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});
dbConnectionPool.getConnection((error,dbConnection)=>{
    if(error){
        console.log(`Database connection error!: ${error}`);
    } else {//Successfully reconnected to the DB! Now DELETE errors table!
        dbConnection.query({sql:"DELETE FROM errors"},
            (error,results,fields)=>{dbConnection.release();
                if(error){
                    console.log("Couldn't cleanup the errors table!");
                } else {
                    dbConnection.query({
                        sql:"INSERT INTO errors (`lError`, `lStatus`, `lDesc`) VALUES (0,?,?)",
                        values: [200,'Database finished cleaning logs!']
                    },(error,results,fields)=>{if(error){console.log(error);}
                    });
                }
            }
        );
    }
});
module.exports=dbConnectionPool;
