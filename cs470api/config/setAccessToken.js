module.exports=(ctx, user)=>{
    const exp_date=Date.now()+(20 * 60 * 1000); // expiration date 20 minutes from now
    // Set the data that will be sent in the user's access_token. The exp setting should probably
    // be set slightly ahead of the cookie's expiration date that stores it so that we can be
    // sure that if the cookie is present, then the access_token is probably valid (but we'll
    // still check it anyways).
    let token_opts={
        type:'web',
        exp:Math.floor(exp_date/1000 + (60 * 1)), // expire the access_token 1m after the cookie
        user:user
    };
    const access_token=(require('jsonwebtoken')).sign(token_opts, process.env.JWT_KEY); // Sign the access_token
    ctx.cookies.set('access_token',access_token,{// Provide the access_token to the user via a cookie
        Expires: new Date(exp_date),// Set the cookie's expiry
        Domain: process.env.API_HOST,// Tell the cookie where it should be sent to
        // Path:<path-value>,// the required URL path to send the Cookie
        Secure:process.env.API_ENV!=='local',// Only send access_token over encrypted connection unless local dev
        HttpOnly:true,// Protect the cookie from js in XSS/injection attacks
        SameSite:"Strict",// only send cookie when URL is our Domain+Path
        // SameSite:Lax,// default, send cookie when URL is our Domain+Path and when navigating to it from an external site
        // SameSite:None; Secure// send cookie on any cross-site requests (to not our Domain+Path) requires Secure in cookie
    });
}
