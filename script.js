const STOPS = [
    {
        title: "Orlen Úvaly",
        icon: "⛽",
        lat: 50.0689311,
        lng: 14.7308231,
        radius: 50,
        clue: "Tam, kde se naše cesty poprvé protnuly. Dobrý den! ⛽",
        story: "Právě tady se naše cesty poprvé protnuly."
    },
    {
        title: "Zmrzlina Čelákovice",
        icon: "🍦",
	lat: 50.1624961,
        lng: 14.7507606,
        radius: 50,
	clue: "Docela nám to teklo po rukách! 🍦",
        story: "Tohle byla naše první společná zmrzka."
    },
    {
        title: "Las Vegas",
        icon: "🏖️👙🐸",
	lat: 50.2682533,
        lng: 14.6513617,
        radius: 20,
	clue: "Víš, že žáby nemají uši?!. 🏖️👙🐸"
        story: "Na koupání byla moc zima...👀"
    }
];

let current = parseInt(localStorage.getItem("station")) ?? -1;
let phase = localStorage.getItem("phase") || "clue";

if (isNaN(current)) {
    current = -1;
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

            <button onclick="showStory()">
                Jsem na místě
            </button>

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

            <button onclick="nextStop()">
                Pokračovat
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
                Verze 1 • Bez GPS
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
    current = -1;
    render();
}

function showStory() {
    phase = "story";
    localStorage.setItem("phase", phase);
    render();
}
