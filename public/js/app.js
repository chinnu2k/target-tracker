let weekData = [];

async function loadGoals(){
 const goalsData = await fetch("/api/goals").then(r=>r.json());
 const today = new Date().toISOString().slice(0,10);
 const prog = await fetch("/api/progress/all").then(r=>r.json());

 goals.innerHTML="";
 goalsData.forEach(g=>{
  const doneToday = prog.find(p=>p.goalId===g._id && p.date===today);
  goals.innerHTML+=`
   <div class="list-group-item d-flex justify-content-between ${doneToday?'list-group-item-success':''}">
    ${g.title}
    <button class="btn btn-sm ${doneToday?'btn-secondary':'btn-success'}"
     onclick="markDone('${g._id}')" ${doneToday?'disabled':''}>
     ${doneToday?'Done':'Mark Done'}
    </button>
   </div>`;
 });
 loadWeek(prog);
}


function markDone(id){
 fetch("/api/progress",{method:"POST",headers:{"Content-Type":"application/json"},
 body:JSON.stringify({goalId:id, date:new Date().toISOString().slice(0,10)})})
 .then(()=>loadGoals());
}


function loadWeek(data){
 let counts = {};
 data.forEach(p=>{
  if(p.done) counts[p.date] = (counts[p.date]||0)+1;
 });
 drawChart(Object.keys(counts),Object.values(counts));
}


function drawChart(labels,data){
 new Chart(document.getElementById("weekChart"),{
  type:'bar',
  data:{labels,datasets:[{label:'Tasks Done',data}]}
 });
}
