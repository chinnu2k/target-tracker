let weekData = [];

function loadGoals(){
 fetch("/api/goals").then(r=>r.json()).then(d=>{
  goals.innerHTML="";
  d.forEach(g=>{
    goals.innerHTML+=`
     <button class="list-group-item list-group-item-action d-flex justify-content-between">
      ${g.title}
      <span>
        <button class="btn btn-success btn-sm" onclick="markDone('${g._id}')">Done</button>
      </span>
     </button>`;
  });
 });
 loadWeek();
}

function markDone(id){
 fetch("/api/progress",{method:"POST",headers:{"Content-Type":"application/json"},
 body:JSON.stringify({goalId:id,date:new Date().toISOString().slice(0,10),completed:1,total:1})})
 .then(()=>loadWeek());
}

function loadWeek(){
 fetch("/api/progress/all")
 .then(r=>r.json())
 .then(data=>{
   let counts = {};
   data.forEach(p=>{
     counts[p.date] = (counts[p.date]||0)+p.completed;
   });
   drawChart(Object.keys(counts),Object.values(counts));
 });
}

function drawChart(labels,data){
 new Chart(document.getElementById("weekChart"),{
  type:'bar',
  data:{labels,datasets:[{label:'Tasks Done',data}]}
 });
}
