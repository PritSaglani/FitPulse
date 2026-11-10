const NAV={user:[['index','Dashboard'],['workouts','Workouts'],['diet','Diet plan'],['progress','Progress'],['profile','My profile']],
 admin:[['index','Overview'],['users','Members'],['workouts','Workout plans'],['diets','Diet plans'],['add-member','Add member']]};
const heart='<svg viewBox="0 0 40 40"><path d="M20 35S4 25 4 14a8 8 0 0116-3 8 8 0 0116 3c0 11-16 21-16 21z" fill="#ff5a4e"/><path d="M6 20h9l3-6 4 11 3-5h9" stroke="#fff" stroke-width="2" fill="none"/></svg>';
function toast(m){let t=document.getElementById('toast');if(!t){t=document.createElement('div');t.id='toast';document.body.append(t)}
 t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500)}
(function(){
 const b=document.body,p=b.dataset.panel,pg=b.dataset.page;if(!p)return;
 const other=p==='user'?'admin':'user';
 const links=NAV[p].map(([f,l])=>`<a href="${f}.html" class="${f===pg?'on':''}">${l}</a>`).join('');
 b.insertAdjacentHTML('afterbegin',`<aside class="side"><a class="logo" href="index.html">${heart}FitPulse</a>${links}<a class="sw" href="../${other}/index.html">Switch to ${other} panel</a><a href="../index.html">Log out</a></aside>`);
})();
