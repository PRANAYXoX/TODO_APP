//----CODE TO DEAL WITH CHECKBOX TO MARK TASK AS COMPLETE--------------
var id;
var myCheck=document.getElementsByClassName('myCheck');
var taskTitle=document.getElementsByClassName('task-title');
for(let i =0;i<myCheck.length;i++)
{
    myCheck[i].addEventListener('click',()=>{
                                                id=myCheck[i].getAttribute('data-id');
                                                document.getElementById('modal-head').innerText="Is the Task Completed?";
                                                document.getElementById('modal-b1').innerHTML="<span style='color:red;'>ID:</span>"+id;
                                            });
    
}
var btUpdate=document.getElementById('update-doc');
btUpdate.addEventListener('click',()=>{
                                            btUpdate.setAttribute('href',`/update/?id=${id}`);
                                        });    
//---below function executes automatically after page load to check completed tasks and disable the checkbox----------
setTimeout(()=>{
                for(var i=0;i<myCheck.length;i++)
                {
                    if(myCheck[i].getAttribute('data-status')=="COMPLETED"){ //if task is COMPLETED check the checkbox, disable checkbox  and cross the task title----------------
                        myCheck[i].checked="true";
                        myCheck[i].disabled="true";
                        taskTitle[i].classList.add('taskDone');
                    }
                }
            },2000);
//---CODE TO DELE WITH DELETE TASK-------------------------
var delTask=document.getElementsByClassName('delete-bin');
for(let i=0;i<delTask.length;i++)
{
  delTask[i].addEventListener('click',()=>{
                                            id=delTask[i].getAttribute('data-id');
                                            document.getElementById('modal-head').innerText="Do you want to delete the task?";
                                            document.getElementById('modal-b1').innerHTML="<span style='color:red;'>ID:</span>"+id;
                                            var delBtn=document.getElementById('update-doc');
                                            delBtn.addEventListener('click',()=>{
                                                            delBtn.setAttribute('href',`/delete/?id=${id}`);
                                                          });
                                           });
}
