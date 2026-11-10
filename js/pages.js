const $=s=>document.querySelector(s),app=$('#app');
const done=Store.get('done',[]);
const P={};
P['user-index']=()=>{const d=new Date(),kcal=done.reduce((a,i)=>a+(DB.workouts[i]?.k||0),0),pct=Math.min(kcal/600,1),w=Store.get('water',0);
 app.innerHTML=`<h1>Good ${d.getHours()<12?'morning':'evening'}, Aarav</h1><p class="sub">${d.toDateString()}</p>
 <div class="hero"><svg class="ring" viewBox="0 0 120 120"><circle class="bg" cx="60" cy="60" r="50"/><circle class="fg" id="fg" cx="60" cy="60" r="50" style="stroke-dashoffset:314"/></svg>
 <div><h2>${kcal} / 600 kcal burned</h2><p>${pct>=1?'Daily goal smashed!':'Finish a workout to fill your ring.'}</p><br><a class="btn alt" href="workouts.html">Start a workout</a></div></div>
 <div class="grid"><div class="card stat"><b>${done.length}</b><span>Workouts done</span></div><div class="card stat"><b>${w} / 8</b><span>Glasses of water</span><br><br><button class="btn" id="wb">Add glass</button></div>
 <div class="card stat"><b>1,800</b><span>Calorie target</span></div><div class="card stat"><b>12 days</b><span>Current streak</span></div></div>
 <div class="card"><h3>Today's plan</h3>${DB.workouts.slice(0,3).map(x=>`<p style="padding:8px 0">${x.n} <span class="tag">${x.t}</span> ${x.m} min</p>`).join('')}</div>`;
 setTimeout(()=>$('#fg').style.strokeDashoffset=314*(1-pct),100);
 $('#wb').onclick=()=>{Store.set('water',Math.min(w+1,8));P['user-index']()}};
P['user-workouts']=()=>{let f='All';
 const draw=()=>{const list=DB.workouts.map((x,i)=>({...x,i})).filter(x=>f==='All'||x.t===f);
 app.innerHTML=`<h1>Workouts</h1><p class="sub">Pick a session and mark it done.</p>
 <div class="chips">${['All','Strength','Cardio','Yoga'].map(c=>`<button class="chip ${c===f?'on':''}">${c}</button>`).join('')}</div>
 <div class="bar"><i style="width:${done.length/DB.workouts.length*100}%"></i></div><p class="sub">${done.length} of ${DB.workouts.length} completed</p>
 <div class="grid">${list.map(x=>`<div class="card ${done.includes(x.i)?'done':''}"><span class="tag">${x.t}</span><h3 style="margin:10px 0 4px">${x.n}</h3><p class="sub" style="margin:0 0 12px">${x.d}<br>${x.m} min, ${x.k} kcal</p><button class="btn ${done.includes(x.i)?'ghost':''}" data-i="${x.i}">${done.includes(x.i)?'Undo':'Mark done'}</button></div>`).join('')}</div>`;
 document.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{f=c.textContent;draw()});
 document.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;done.includes(i)?done.splice(done.indexOf(i),1):done.push(i);Store.set('done',done);draw()})};draw()};
P['user-diet']=()=>{const eaten=Store.get('eaten',[]),d=DB.diets[0];
 const draw=()=>{const k=SEED.meals.reduce((a,m,i)=>a+(eaten.includes(i)?m[2]:0),0);
 app.innerHTML=`<h1>Diet plan: ${d.n}</h1><p class="sub">Tick meals as you eat them.</p>
 <div class="grid"><div class="card"><h3>${k} / ${d.kcal} kcal</h3><div class="bar"><i style="width:${k/d.kcal*100}%"></i></div></div>
 ${[['Protein',d.p],['Carbs',d.c],['Fat',d.f]].map(m=>`<div class="card stat"><b>${m[1]}g</b><span>${m[0]}</span></div>`).join('')}</div>
 <div class="card"><table><tr><th></th><th>Meal</th><th>Menu</th><th>kcal</th></tr>${SEED.meals.map((m,i)=>`<tr><td><input type="checkbox" style="width:auto" data-m="${i}" ${eaten.includes(i)?'checked':''}></td><td>${m[0]}</td><td>${m[1]}</td><td>${m[2]}</td></tr>`).join('')}</table></div>`;
 document.querySelectorAll('[data-m]').forEach(c=>c.onchange=()=>{const i=+c.dataset.m;c.checked?eaten.push(i):eaten.splice(eaten.indexOf(i),1);Store.set('eaten',eaten);draw()})};draw()};
P['user-progress']=()=>{const w=Store.get('weights',[78,77.2,76.8,76,75.5,75.1,74.6]);
 const draw=()=>{const mx=Math.max(...w),mn=Math.min(...w)-3;
 app.innerHTML=`<h1>Progress</h1><p class="sub">Log your weight and track the trend.</p>
 <div class="card"><div class="chart">${w.map(v=>`<div style="height:${(v-mn)/(mx-mn)*100}%"><small>${v}</small></div>`).join('')}</div></div><br>
 <div class="grid"><div class="card"><label>Today's weight (kg)</label><input id="wi" type="number" step="0.1"><br><br><button class="btn" id="wa">Save weight</button></div>
 <div class="card"><label>Height (cm)</label><input id="h" type="number" value="172"><br><br><button class="btn alt" id="bm">Calculate BMI</button><h3 id="bo" style="margin-top:10px"></h3></div></div>`;
 $('#wa').onclick=()=>{const v=parseFloat($('#wi').value);if(!(v>20&&v<300))return toast('Enter a valid weight');w.push(v);Store.set('weights',w);draw();toast('Weight saved')};
 $('#bm').onclick=()=>{const b=w[w.length-1]/((+$('#h').value/100)**2);$('#bo').textContent='BMI '+b.toFixed(1)+(b<18.5?' (Under)':b<25?' (Healthy)':' (Over)')}};draw()};
P['user-profile']=()=>{const p=Store.get('profile',null);if(p)Object.entries(p).forEach(([k,v])=>{const e=document.querySelector(`[name=${k}]`);if(e&&e.type!=='radio')e.value=v});
 initForm($('#pf'),d=>{delete d.password;delete d.confirm;Store.set('profile',d);toast('Profile saved')})};
P['admin-index']=()=>{const m=['Jun','Jul','Aug','Sep','Oct','Nov'],v=[4,7,9,12,15,DB.users.length+14];
 app.innerHTML=`<h1>Overview</h1><p class="sub">How FitPulse is doing.</p><div class="grid">
 <div class="card stat"><b>${DB.users.length}</b><span>Active members</span></div><div class="card stat"><b>${DB.workouts.length}</b><span>Workout plans</span></div>
 <div class="card stat"><b>${DB.diets.length}</b><span>Diet plans</span></div><div class="card stat"><b>87%</b><span>Weekly adherence</span></div></div>
 <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr))"><div class="card"><h3>New members</h3><div class="chart">${v.map(x=>`<div style="height:${x/20*100}%"><small>${x}</small></div>`).join('')}</div><p class="sub">${m.join(' / ')}</p></div>
 <div class="card"><h3>Latest sign-ups</h3>${DB.users.slice(-4).reverse().map(u=>`<p style="padding:8px 0">${u.name} <span class="tag">${u.goal}</span></p>`).join('')}</div></div>`};
P['admin-users']=()=>{const draw=(q='')=>{const L=DB.users.filter(u=>(u.name+u.email).toLowerCase().includes(q.toLowerCase()));
 app.innerHTML=`<h1>Members</h1><p class="sub">Search, reassign plans or remove members.</p><input id="q" placeholder="Search members" value="${q}" style="max-width:320px;margin-bottom:16px">
 <div class="card" style="overflow-x:auto"><table><tr><th>Name</th><th>Goal</th><th>Workout</th><th>Diet</th><th></th></tr>${L.map(u=>`<tr><td>${u.name}<br><small>${u.email}</small></td><td>${u.goal}</td>
 <td><select data-w="${u.id}">${DB.workouts.map(w=>`<option ${w.n===u.workout?'selected':''}>${w.n}</option>`).join('')}</select></td>
 <td><select data-d="${u.id}">${DB.diets.map(w=>`<option ${w.n===u.diet?'selected':''}>${w.n}</option>`).join('')}</select></td><td><button class="btn ghost" data-x="${u.id}">Remove</button></td></tr>`).join('')||'<tr><td>No members found. Use Add member to create one.</td></tr>'}</table></div>`;
 const f=$('#q');f.focus();f.setSelectionRange(q.length,q.length);f.oninput=()=>draw(f.value);
 document.querySelectorAll('[data-w]').forEach(s=>s.onchange=()=>{DB.users.find(u=>u.id==s.dataset.w).workout=s.value;DB.save();toast('Workout updated')});
 document.querySelectorAll('[data-d]').forEach(s=>s.onchange=()=>{DB.users.find(u=>u.id==s.dataset.d).diet=s.value;DB.save();toast('Diet updated')});
 document.querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>{DB.users=DB.users.filter(u=>u.id!=b.dataset.x);DB.save();draw(q);toast('Member removed')})};draw()};
P['admin-workouts']=()=>{const draw=()=>{app.innerHTML=`<h1>Workout plans</h1><p class="sub">Create and retire plans members can follow.</p>
 <div class="card" style="margin-bottom:20px;display:flex;gap:10px;flex-wrap:wrap"><input id="n" placeholder="Plan name" style="flex:2"><select id="t" style="flex:1"><option>Strength</option><option>Cardio</option><option>Yoga</option></select><input id="m" type="number" placeholder="Minutes" style="flex:1"><button class="btn" id="a">Add plan</button></div>
 <div class="grid">${DB.workouts.map((w,i)=>`<div class="card"><span class="tag">${w.t}</span><h3 style="margin:8px 0">${w.n}</h3><p class="sub" style="margin:0 0 10px">${w.m} min, ${w.k} kcal<br>${DB.users.filter(u=>u.workout===w.n).length} members</p><button class="btn ghost" data-r="${i}">Delete</button></div>`).join('')}</div>`;
 $('#a').onclick=()=>{const n=$('#n').value.trim(),m=+$('#m').value;if(n.length<3||!(m>0))return toast('Enter a name and minutes');DB.workouts.push({n,t:$('#t').value,m,k:m*8,d:'Custom plan'});DB.save();draw();toast('Plan added')};
 document.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{DB.workouts.splice(b.dataset.r,1);DB.save();draw()})};draw()};
P['admin-diets']=()=>{app.innerHTML=`<h1>Diet plans</h1><p class="sub">Adjust calorie targets and see who follows each plan.</p><div class="grid">
 ${DB.diets.map((d,i)=>`<div class="card"><h3>${d.n}</h3><p class="sub" style="margin:4px 0">${DB.users.filter(u=>u.diet===d.n).length} members</p>
 <label>Calories</label><input type="number" value="${d.kcal}" data-k="${i}"><p style="margin:10px 0">P ${d.p}g, C ${d.c}g, F ${d.f}g</p></div>`).join('')}</div><button class="btn alt" id="s">Save changes</button>`;
 $('#s').onclick=()=>{document.querySelectorAll('[data-k]').forEach(i=>{if(+i.value>800)DB.diets[i.dataset.k].kcal=+i.value});DB.save();toast('Diet plans saved')}};
P['admin-add-member']=()=>{const fill=(id,arr)=>$(id).innerHTML='<option value="">Choose...</option>'+arr.map(x=>`<option>${x.n}</option>`).join('');
 fill('#workout',DB.workouts);fill('#diet',DB.diets);
 initForm($('#af'),d=>{DB.users.push({id:Date.now(),name:d.name,email:d.email,phone:d.phone,goal:d.goal,workout:d.workout,diet:d.diet});DB.save();$('#af').reset();toast('Member added');setTimeout(()=>location.href='users.html',900)})};
(P[document.body.dataset.panel+'-'+document.body.dataset.page]||(()=>{}))();
