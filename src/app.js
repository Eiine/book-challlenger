const express = require('express');
const mainRouter = require('./routes/main');
const atuth= require("../src/controllers/autorizacion");
const session = require('express-session');
var cookieParser = require('cookie-parser');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/app",atuth)
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(session({
    secret:"123456",
    resave:true,
    saveUninitialized:true,}))
app.use(cookieParser());
app.use((req,res,next)=>{
  let usuario=req.cookies.user
  app.locals.roll=[]
  if( usuario){
    app.locals.roll= usuario 
    
    
  }else{
    console.log("no hay usuario");
  }
  next()
})


app.use('/', mainRouter);

app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
