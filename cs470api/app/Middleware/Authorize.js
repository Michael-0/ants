module.exports=(min_type)=>(ctx,next)=>{
    console.log('min_type in authorize is',min_type);
    console.log('In Authorize. ctx.state = ',ctx.state);
    console.log('In Authorize. ctx.state.jwtdata = ',ctx.state.jwtdata);
    const user_type=ctx.state.jwtdata.user.role;
    if(min_type==='admin'&&user_type!=='admin'){
        return false;
    }
    require('../../config/setAccessToken')(ctx,ctx.state.jwtdata.user);
    return next();
};
