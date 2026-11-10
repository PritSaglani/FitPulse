const RULES={
 name:[v=>v.trim().length>=3,'Enter at least 3 characters'],
 email:[v=>/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v),'Use a format like name@example.com'],
 phone:[v=>/^[6-9]\d{9}$/.test(v),'Enter 10 digits starting with 6-9'],
 password:[v=>v.length>=8,'Password needs 8+ characters'],
 pattern:[v=>/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])/.test(v),'Add upper, lower, number and symbol'],
 age:[v=>v>=12&&v<=90,'Age must be 12-90'],
 num:[v=>v>0,'Enter a value above 0'],
 select:[v=>v!=='','Please choose an option'],
 req:[v=>v.trim()!=='','This field is required']};
function showErr(el,msg){const s=el.closest('div').querySelector('.err');if(s)s.textContent=msg;el.classList.toggle('bad',!!msg);el.classList.toggle('ok',!msg)}
function checkField(el){
 for(const r of (el.dataset.v||'').split(' ').filter(Boolean)){
  if(r==='match'){if(el.value!==document.getElementById(el.dataset.match).value){showErr(el,'Passwords do not match');return false}continue}
  const [fn,msg]=RULES[r];if(!fn(el.value)){showErr(el,msg);return false}}
 showErr(el,'');return true}
function initForm(form,onValid){
 form.noValidate=true;
 form.querySelectorAll('[data-v]').forEach(el=>el.addEventListener('input',()=>checkField(el)));
 form.addEventListener('submit',e=>{e.preventDefault();
  let ok=true;form.querySelectorAll('[data-v]').forEach(el=>{if(!checkField(el))ok=false});
  const g=form.querySelector('.radios');if(g){const c=g.querySelector('input:checked');g.querySelector('.err').textContent=c?'':'Select a gender';if(!c)ok=false}
  if(ok)onValid(Object.fromEntries(new FormData(form)));else toast('Fix the highlighted fields')})}
