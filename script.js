const DEBUG_MODE = false; //Tohle přepnout na false až to půjde live, jinak to přepíná do debugu, abych mohl testovat
const STOPS = [
    {
        title: "Orlen Úvaly",
        icon: "⛽",
		code: "ORLEN",
        lat: 50.0907142, //Změnit souřadnice na správnou lokalitu -> teď je tam práce
        lng: 14.6133172,
        radius: 75,
        clue: "Tam, kde se naše cesty poprvé protnuly. Dobrý den! ⛽",
        story: "Právě tady se naše cesty poprvé protnuly."
    },
    {
        title: "Zmrzlina Čelákovice",
        icon: "🍦",
		code: "ZMRZKA",
		lat: 50.1624961,
        lng: 14.7507606,
        radius: 75,
		clue: "Docela nám to teklo po rukách! 🍦",
        story: "Tohle byla naše první společná zmrzka."
    },
    {
        title: "Las Vegas",
        icon: "🏖️👙🐸",
		code: "VEGAS",
		lat: 50.2682533,
        lng: 14.6513617,
        radius: 150,
		clue: "Víš, že žáby nemají uši?!. 🏖️👙🐸",
        story: "Na koupání byla moc zima...👀"
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
                <h1>🏍️ Cesta za dobrodružstvím</h1>

                <p class="subtitle">
                    Ahoj lásko.<br><br>

                    Dnes tě čeká malá výprava.<br>
                    Každá zastávka ukrývá další část příběhu.<br><br>

                    Není důležitý cíl.<br>
                    Důležitá je cesta.
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

                <h1>❤️ Gratuluji</h1>

                <p class="story">
                    Dorazila jsi až sem.<br><br>

                    Dnešní cesta možná končí,
                    ale doufám, že naše společná cesta bude pokračovat ještě hodně dlouho.
                </p>

                <button class="reset-btn" onclick="resetGame()">
                    Hrát znovu
                </button>

				<div class="footer">
                    Verze 3 • S GPS ověřením
                </div>

            </div>
        `;

        return;
    }

    const stop = STOPS[current];

    if (phase === "clue") {

    content.innerHTML = `
        <div class="card">

            <h2>🔎 Malá nápověda</h2>

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

			<p style="text-align:center";>
    			🔐 Obnovovací kód:
    			<strong>${stop.code}</strong><br>
				(Ulož si ho pro případ potíží)
			</p>

            <button onclick="nextStop()">
                Pokračovat
            </button>

			<button class="reset-button" onclick="resetGame()">
    			🔄 Restartovat hru
			</button>

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
        <p style="color:orange">
            🧪 DEBUG MODE
        </p>

        <p>
            LAT: ${position.coords.latitude}<br>
            LNG: ${position.coords.longitude}
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
                    <p style="color:lightgreen; text-align:center;">
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
                    <p style="color:#ff8080; text-align:center;">
                        ❌ Ještě nejsi na správném místě
                    </p>

                    <p>
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
                <p style="color:#ff8080; text-align:center;">
                    GPS není dostupná.<br>
                    Zkontroluj, že je povolena poloha a obnov stránku.
                </p>
            `;

        }

    );

}
