const DEBUG_MODE = true; //Tohle přepnout na false až to půjde live, jinak to přepíná do debugu, abych mohl testovat
const FINAL_CODE = "88888"; //Kód změnit dle toho co si bude člověk zapisovat
const STOPS = [
    {
        title: "ORLEN ÚVALY",
        icon: "⛽",
		code: "ORLEN",	//Kód pro obnovu hry
		secret: "8",	//Finální kód, který odemkne poslední stránku
        photo: "images/orlen.jpg",  //Fotka, která se zobrazí na stránce s příběhem
        lat:    50.0687000, 
        lng: 	14.3947000,
        radius: 75, //Oblast ve které dojde k validaci pozice
        clue: "Tam, kde se naše cesty poprvé protnuly.<br>Dobrý den! ⛽",
        story: "Právě tady se naše cesty poprvé protnuly."
    },
    {
        title: "ZMRZLINA ČELÁKOVICE",
        icon: "🍦",
		code: "ZMRZKA",
		secret: "8",
        photo: "images/zmrzka.jpg",
		lat: 50.1624961,
        lng: 14.7507606,
        radius: 75,
		clue: "Moc jsme při tom teda nemlčeli... 🍦",
        story: "Tohle byla naše první společná zmrzka."
    },
    {
        title: "LAS VEGAS",
        icon: "🐸",
		code: "VEGAS",
		secret: "8",
        photo: "images/vegas.jpg",
		lat: 50.2682533,
        lng: 14.6513617,
        radius: 150,
		clue: "Víš, že žáby nemají uši?!. 🏖️👙🐸",
        story: "Na koupání byla moc zima...👀"
    },
	{
        title: "HOSTIVAR H1",
        icon: "🍺",
		code: "HOSTIVAR",
		secret: "8",
        photo: "images/hostivar.jpg",
		lat: 50.0463592,
        lng: 14.5494106,
        radius: 50,
		clue: "Tam, kam se Bobeš vždy nemůže dočkat. 🍺",
        story: "Tady si vždy dáme do nosu! Tak samo i teď, jen tedy nealko."
    },
	{
        title: "NÁŠ DOMOV",
        icon: "🏠",
		code: "DOMOV",
		secret: "8",
        photo: "images/domov.jpg",
		lat: 50.0468075,
        lng: 14.5553103,
        radius: 50,
		clue: "Další místo leží těsně před tím, než auta a motorky zmizí pod zemí. 🏠🏍️",
        story: "Poslední místo tvého pátrání a první místo naší společné cesty. ♥️<br><br> Pokud sis správně zapsla všechna čísla, je čas na odměnu!"
    }
];

let current = parseInt(localStorage.getItem("station")) ?? -1;
let phase = localStorage.getItem("phase") || "clue";

if (isNaN(current)) {
    current = -1;
}

function getDistance(lat1, lon1, lat2, lon2) {

    const R = 6371000;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
    );

    return R * c;
}

render();

function render() {

    const content = document.getElementById("content");

    if (current === -1) {

        content.innerHTML = `
            <div class="card">
                <h1>🏍️ SVÁTEČNÍ ESKAPÁDY</h1>

                <p class="subtitle">
                    Ahoj lásko.<br><br>

                    Dnes tě čeká Tvá výprava za dobrodružstvím.<br>
					Potřebuji, abys dnes dorazila brzo domů, připravila se, a až budeš v sedle, započala cestu.<br><br>
                    Bude to výlet o několika zastávkách. Každá zastávka ukrývá nějaké tajemství a zároveň otevírá cestu dál.<br><br>
                    Dokážeš najít všechna místa správně?<br><br>

                </p>

                <button onclick="startGame()">
                    Začít
                </button>

				<button onclick="recoverGame()">
    				🔓 Obnovit postup
				</button>

                <div class="footer">
                    Verze 3 • S GPS ověřením
                </div>

            </div>
        `;

        return;
    }

    if (current >= STOPS.length) {

        content.innerHTML = `
    		<div class="card">
        		<h1>🔐 Poslední úkol 🔐</h1>
				
        		<p class="story">
            		Během cesty jsi získala několik tajných čísel.<br>
            		Zadej je ve správném pořadí.
        		</p>

        		<div style="text-align:center;">
                    <input
            		    id="final-code"
            		    type="text"
            		    placeholder="Tajný kód"
                        style="text-align: center;"
        		    >   
                </div>

        		<br><br>

        		<button onclick="checkFinalCode()">
            		Odemknout překvapení
        		</button>

        		<div id="final-result"></div>

                <button class="reset-button" onclick="resetGame()">
    			🔄 Restartovat hru
			    </button>

    		</div>
`;

        return;
    }

    const stop = STOPS[current];

    if (phase === "clue") {

    content.innerHTML = `
        <div class="card">

            <h2>🔎 TVÁ NÁPOVĚDA</h2>

            <p class="story">
                ${stop.clue}
            </p>

            <button onclick="checkLocation()">
                📍 Ověřit polohu
            </button>
            <div id="gps-result"></div>

			<button class="reset-button" onclick="resetGame()">
    			🔄 Restartovat hru
			</button>

			<div class="footer">
                    Verze 3 • S GPS ověřením
            </div>

        </div>
    `;

    return;
}

    content.innerHTML = `
        <div class="card">

            <div class="station">
                ${stop.icon} Zastávka ${current + 1} z ${STOPS.length}
            </div>

            <h2>${stop.title}</h2>

            <p class="story">
                ${stop.story}
            </p>
            
            <img
                src="${stop.photo}"
                class="memory-photo"                
            >

			<p style="text-align:center;">
    			⭐ Tajné číslo:
    			<strong>${stop.secret}</strong><br>
    			(Zapiš si ho, bude se hodit na konci.)
			</p>        
			
            <button onclick="nextStop()">
                Pokračovat
            </button>

			<button class="reset-button" onclick="resetGame()">
    			🔄 Restartovat hru
			</button>

            <p style="text-align:center";>
    			🔐 Obnovovací kód:
    			<strong>${stop.code}</strong><br>
				(Ulož si ho pro případ potíží)
			</p>

           <div class="progress-container">
                <div
                    class="progress-bar"
                    style="width:${((current + 1) / STOPS.length) * 100}%">
                </div>
            </div>

            <div class="progress-text">
                    ${current + 1} / ${STOPS.length}
            </div>
            
            <div class="footer">
                Verze 3 • S GPS ověřením
            </div>

        </div>
    `;
}

function startGame() {
    current = 0;
    phase = "clue";
    localStorage.setItem("station", current);
    localStorage.setItem("phase", phase);
    render();
}

function nextStop() {
    current++;
    phase = "clue";
    localStorage.setItem("station", current);
    localStorage.setItem("phase", phase);
    render();
}

function resetGame() {
    localStorage.removeItem("station");
    localStorage.removeItem("phase");
    current = -1;
    phase = "clue";
    render();
}

function recoverGame() {
    const code = prompt("Zadej obnovovací kód:");

    if(!code){
        return;
    }

    const stopIndex = STOPS.findIndex(
        stop => stop.code === code.toUpperCase()
    );

    if(stopIndex === -1){

        alert("Neplatný kód.");

        return;
    }

    current = stopIndex + 1;
    phase = "clue";

    localStorage.setItem(
        "station",
        current
    );

    localStorage.setItem(
        "phase",
        phase
    );

    render();
}

function showStory() {
    phase = "story";
    localStorage.setItem("phase", phase);
    render();
}

function checkLocation() {

    const stop = STOPS[current];

    if(DEBUG_MODE){

    document.getElementById("gps-result").innerHTML = `
        <p style="color:orange; text-align:center;">
            🧪 DEBUG MODE
        </p>

        <button onclick="showStory()">
            Přeskočit GPS kontrolu
        </button>
    `;

    return;
}

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const distance = getDistance(
                position.coords.latitude,
                position.coords.longitude,
                stop.lat,
                stop.lng
            );

            if(distance <= stop.radius){

                document.getElementById(
                    "gps-result"
                ).innerHTML = `
                    <p class="location-found">
                        ✅ Správné místo nalezeno
                    </p>

                    <button onclick="showStory()">
                        Pokračovat
                    </button>
                `;

            } else {

                document.getElementById(
                    "gps-result"
                ).innerHTML = `
                    <p class="location-not-found">
                        ❌ Ještě nejsi na správném místě
                    </p>

                    <p style="text-align:center;">
                        Zbývá přibližně
                        ${Math.round(distance)}
                        metrů
                    </p>
                `;

            }

        },

        function(error){

            document.getElementById(
                "gps-result"
            ).innerHTML = `
                <p class="location-not-found">
                    GPS není dostupná.<br>
                    Zkontroluj, že je povolena poloha a obnov stránku.
                </p>
            `;

        }

    );

}

function checkFinalCode() {

    const enteredCode =
        document.getElementById("final-code").value;

    if(enteredCode === FINAL_CODE){

        document.getElementById("final-result").innerHTML = `
            <p class="location-found">
                🎁 Správně!
            </p>

            <p class="final-text">
                Tvůj dárek si vozíš celou dobu s sebou...Jsem to jáááááá! 😗 <br>                
            </p>

            <p class="final-gift">
                <strong>Ale taky mrkni pod sedačku. ♥️🤭</strong><br>
                ⬇️
            </p>

          <div class="album-slowness">   
                <h2>📸 Naše malé album</h2>

                <div class="album">

                <img src="images/orlen.jpg" class="album-photo">
                <img src="images/zmrzka.jpg" class="album-photo">
                <img src="images/vegas.jpg" class="album-photo">
                <img src="images/hostivar.jpg" class="album-photo">
                <img src="images/domov.jpg" class="album-photo">

                </div>
            </div>

            
        `;
        confetti({
            particleCount: 150,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });

        confetti({
            particleCount: 150,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

    } else {

        document.getElementById("final-result").innerHTML = `
            <p style="color:#ff8080; text-align:center;">
                ❌ To není správný kód.
            </p>
        `;

    }
}
