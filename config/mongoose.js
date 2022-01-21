const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/pro_Todo');
 
const db=mongoose.connection;

db.on('error',console.log.bind('Connectivity Error'));

db.once('open',function(){
    console.log("CONNECTON ESTABLISHED!");
});