function addGoal(){
 fetch("/api/goals",{method:"POST",headers:{"Content-Type":"application/json"},
 body:JSON.stringify({title:title.value,type:type.value,tasks:[]})});
}

function loadGoals(){
 fetch("/api/goals").then(r=>r.json()).then(d=>{
  goals.innerHTML="";
  d.forEach(g=>{
    goals.innerHTML+=`
     <div>
      <b>${g.title}</b> (${g.type})
      <button onclick="markDone('${g._id}')">Done Today</button>
     </div>`;
  });
 });
}

function markDone(id){
 fetch("/api/progress",{method:"POST",headers:{"Content-Type":"application/json"},
 body:JSON.stringify({goalId:id,date:new Date().toISOString().slice(0,10),completed:1,total:1})});
}
