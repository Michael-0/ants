const Authorize=require('../app/Middleware/Authorize');
const VerifyJWT=require('../app/Middleware/VerifyJWT');
const router=require('koa-router')({prefix:process.env.API_VER});
//Login Router
const LoginController=new(require('../app/Controllers/LoginController'))();
const loginRouter=require('koa-router')({prefix:'/login'});
loginRouter.post('/',LoginController.authorizeUser);
// Ticket Router
const TicketController=new(require('../app/Controllers/TicketController'))();
const ticketRouter=require('koa-router')({prefix:'/ticket'});
ticketRouter.get('/uNumb/:uNumb',TicketController.uNumb);
ticketRouter.get('/AdminuNumb/:AdminuNumb',TicketController.AdminuNumb)
ticketRouter.get('/ID/:ticketID',TicketController.Ticket);
ticketRouter.get('/Template',TicketController.Template);
ticketRouter.post('/Create',TicketController.Create);
ticketRouter.post('/Update',TicketController.Update);

// Template Router
const TemplateController=new(require('../app/Controllers/TemplateController'))();
const templateRouter=require('koa-router')({prefix:'/template'});
templateRouter.get('/',TemplateController.Templates);
templateRouter.post('/Update',TemplateController.Update);
templateRouter.post('/Create',TemplateController.Create);
// Admin Router
const AdminController=new(require('../app/Controllers/AdminController'))();
const adminRouter=require('koa-router')({prefix:'/admin'});
adminRouter.get('/Requests',AdminController.Requests);
adminRouter.post('/Reject',AdminController.Reject);
adminRouter.post('/Accept',AdminController.Accept);
// User Router
const UserController=new(require('../app/Controllers/UserController'))();
const userRouter=require('koa-router')({prefix:'/user'});
userRouter.get('/Template',UserController.Template);
userRouter.post('/Create',UserController.Create);
router.use(// Register all of the controllers into the default controller.
    loginRouter.routes(),
    ticketRouter.routes(),
    templateRouter.routes(),
    adminRouter.routes(),
    userRouter.routes(),
);
module.exports=(app)=>{
    app.use(router.routes());
    app.use(router.allowedMethods());
};
