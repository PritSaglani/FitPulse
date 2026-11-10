class Store{
 static get(k,d){try{return JSON.parse(localStorage.getItem('fp_'+k))||d}catch(e){return d}}
 static set(k,v){try{localStorage.setItem('fp_'+k,JSON.stringify(v))}catch(e){}}
}
const SEED={
 users:[{id:1,name:'Aarav Shah',email:'aarav@mail.com',phone:'9876543210',goal:'Fat loss',workout:'Burn Starter',diet:'Lean 1800'},
  {id:2,name:'Diya Patel',email:'diya@mail.com',phone:'9123456780',goal:'Muscle gain',workout:'Iron Push-Pull',diet:'Bulk 2800'},
  {id:3,name:'Kabir Mehta',email:'kabir@mail.com',phone:'8899001122',goal:'Flexibility',workout:'Flow Yoga',diet:'Balanced 2200'}],
 workouts:[{n:'Burn Starter',t:'Cardio',m:30,k:320,d:'HIIT intervals + skipping'},{n:'Iron Push-Pull',t:'Strength',m:55,k:410,d:'Bench, rows, shoulder press'},
  {n:'Flow Yoga',t:'Yoga',m:40,k:180,d:'Sun salutations and deep stretch'},{n:'Leg Day',t:'Strength',m:50,k:450,d:'Squats, lunges, deadlifts'},
  {n:'5K Run',t:'Cardio',m:35,k:380,d:'Steady pace outdoor run'},{n:'Core Reset',t:'Yoga',m:20,k:120,d:'Planks and breath work'}],
 diets:[{n:'Lean 1800',kcal:1800,p:130,c:160,f:50},{n:'Balanced 2200',kcal:2200,p:150,c:240,f:65},{n:'Bulk 2800',kcal:2800,p:190,c:330,f:80}],
 meals:[['Breakfast','Oats, banana, whey',420],['Lunch','Dal, rice, paneer sabzi',640],['Snack','Sprouts chaat, buttermilk',230],['Dinner','Grilled chicken/tofu, salad',510]]
};
const DB={users:Store.get('users',SEED.users),workouts:Store.get('workouts',SEED.workouts),diets:Store.get('diets',SEED.diets),
 save(){Store.set('users',this.users);Store.set('workouts',this.workouts);Store.set('diets',this.diets)}};
