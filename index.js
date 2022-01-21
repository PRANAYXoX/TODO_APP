const express=require('express');
const port=8000;
const path=require('path');
const db=require('./config/mongoose');
const Todo=require('./model/todo_Schema');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
app.listen(port,(err)=>{
    if(err){
        console.log("ERROR OCCURED:",err);
        return;
    }
    console.log("PROJECT DEPLOYED ON PORT:"+port);
});
var msg="NOW NEVER FORGET ANY CHORE!";
app.get('/',(req,res)=>{
    Todo.find({},function(err, todos){
        if(err){
            console.log("Error in connection!");
            return;
        }else{
            return res.render('home',{
                status: msg,
                todo:todos
            });
        }
    });
});

app.post('/add-task',(req,res)=>{
    console.log(req.body);
    if(!req.body.newTask || !req.body.category || !req.body.date)
    {
        msg="ALL FIELDS MUST BE FILLED!";
        return res.redirect('back');
    }else{
    Todo.create({task:req.body.newTask,
                category:req.body.category,
                date:req.body.date,
                status:"INCOMPLETE"},function(err,newTask){
        if(err){
            console.log("Error Occured While Adding Task ",err);
            return;
        }
        console.log("RECORD INSERTED!",newTask);
        msg="TASK INSERTED!";
        return res.redirect('back');
    });
}     
});

app.get('/update',(req,res)=>{
       Todo.findByIdAndUpdate(req.query.id,{'status':"COMPLETED"},
       function(err,result){
            if(err){
                console.log("ERROR IN UPDATION ",err);
                msg="UPDATION FAILED!";
            }else{
                msg="UPDATION SUCCESS!";
            }
       });
       return res.redirect('/');
});

app.get('/delete',(req,res)=>{
    console.log(req.query);
    Todo.findByIdAndDelete(req.query.id,function(err){
        if(err){
            msg="DELETION UUNSUCCESSFULL!!";
            return;
        }else{
            msg="TASK DELETED!";
            return res.redirect('/');
        }
    });
    //return res.redirect('/');
});