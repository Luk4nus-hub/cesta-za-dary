const STOPS = [

{
name:"Orlen Český Brod",
lat:50.074,
lng:14.859,
radius:150,
story:"Právě tady se naše cesty poprvé protnuly. Tehdy to byl obyčejný den. A přesto odstartoval příběh, který pokračuje dodnes."
},

{
name:"Stanice 2",
lat:50.100,
lng:14.900,
radius:150,
story:"Každé dobrodružství potřebuje odvahu vyrazit. Pokračuj dál a objev další stopu."
},

{
name:"Stanice 3",
lat:50.120,
lng:14.920,
radius:150,
story:"Silnice se vine krajinou stejně jako naše společné vzpomínky."
},

{
name:"Stanice 4",
lat:50.140,
lng:14.940,
radius:150,
story:"Jsi přesně tam, kde máš být. Další tajemství už čeká."
},

{
name:"Stanice 5",
lat:50.160,
lng:14.960,
radius:150,
story:"Už jsi za polovinou cesty. Cíl je blíž, než si myslíš."
},

{
name:"Stanice 6",
lat:50.180,
lng:14.980,
radius:150,
story:"Někdy je nejkrásnější prostě jet. Bez spěchu. Spolu."
},

{
name:"Stanice 7",
lat:50.200,
lng:15.000,
radius:150,
story:"Poslední stopy jsou na dohled."
},

{
name:"Stanice 8",
lat:50.220,
lng:15.020,
radius:150,
story:"Dojela jsi až sem. Čeká tě poslední krok."
}

];

let current =
parseInt(localStorage.getItem("station")) || -1;

render();

function distance(lat1, lon1, lat2, lon2){

const R = 6371000;

const dLat = (lat2-lat1) * Math.PI/180;
const dLon = (lon2-lon1) * Math.PI/180;

const a =
Math.sin(dLat/2)**2 +
Math.cos(lat1*Math.PI/180) *
Math.cos(lat2*Math.PI/180) *
Math.sin(dLon/2)**2;

const c = 2 * Math.atan2(
Math.sqrt(a),
Math.sqrt(1-a)
);

return R*c;
}

function render(){

const el =
document.getElementById("content");

if(current === -1){

el.innerHTML = `
<div class="card">

<h1>🏍️ Cesta za dary</h1>

<p class="subtitle">
Dnes tě čeká malé dobrodružství.

Každá zastávka ukrývá další stopu.
Nepřemýšlej nad cílem.
Užívej si cestu.
</p>

<button onclick="startGame()">
Začít výpravu
</button>

</div>
`;

return;
}

if(current >= STOPS.length){

el.innerHTML = `
<div class="card">

<h1>❤️ Gratuluji</h1>

<p class="story">
Dojela jsi až sem.

Dnešní cesta možná končí,
ale doufám, že naše společná cesta bude pokračovat ještě hodně dlouho.
</p>

<div class="progress">
🏍️🏍️🏍️
</div>

</div>
`;

return;
}

const stop = STOPS[current];

el.innerHTML = `
<div class="card">

<div class="station">
Zastávka ${current+1} z ${STOPS.length}
</div>

<h2>${stop.name}</h2>

<p class="story">
${stop.story}
</p>

<button onclick="checkLocation()">
📍 Ověřit polohu
</button>

<div id="result"></div>

<div class="progress">
${"●".repeat(current+1)}
${"○".repeat(STOPS.length-current-1)}
</div>

<div class="footer">
Povol GPS pro správnou funkci.
</div>

</div>
`;
}

function startGame(){

current = 0;

localStorage.setItem(
"station",
current
);

render();
}

function checkLocation(){

navigator.geolocation.getCurrentPosition(

position => {

const stop = STOPS[current];

const d = distance(
position.coords.latitude,
position.coords.longitude,
stop.lat,
stop.lng
);

if(d <= stop.radius){

document.getElementById("result").innerHTML = `
<div class="success">
✅ Správné místo nalezeno!
</div>

<button onclick="nextStop()">
Pokračovat dál
</button>
`;
}
else{

document.getElementById("result").innerHTML = `
<div class="error">
❌ Ještě nejsi na správném místě.
</div>

<div class="distance">
Zbývá přibližně ${Math.round(d)} metrů.
</div>
`;
}

},

error => {

document.getElementById("result").innerHTML = `
<div class="error">
GPS není dostupná nebo nebylo uděleno oprávnění.
</div>
`;

}

);

}

function nextStop(){

current++;

localStorage.setItem(
"station",
current
);

render();
}
