const STOPS = [
    {
        title: "Orlen Český Brod",
        icon: "⛽",
        lat: 50.074,
        lng: 14.859,
        radius: 150,
        story: "Právě tady se naše cesty poprvé protnuly."
    },
    {
        title: "Kavárna",
        icon: "☕",
        story: "Každé dobrodružství potřebuje zastávku na doplnění energie."
    },
    {
        title: "Vyhlídka",
        icon: "🌄",
        story: "Někdy je potřeba zastavit a podívat se kolem sebe."
    },
    {
        title: "Lesní cesta",
        icon: "🌲",
        story: "Ne všechny cesty jsou rovné. Ale právě to je dělá zajímavými."
    },
    {
        title: "Místo vzpomínek",
        icon: "📸",
        story: "Každé místo skrývá nějaký příběh."
    },
    {
        title: "Moto zastávka",
        icon: "🏍️",
        story: "Silnice pod koly. Vítr kolem helmy. A další stopa před tebou."
    },
    {
        title: "Předposlední stopa",
        icon: "🧭",
        story: "Cíl už je opravdu blízko."
    },
    {
        title: "Finální místo",
        icon: "❤️",
        story: "Poslední zastávka dnešního dobrodružství."
    }
];

let current = parseInt(localStorage.getItem("station")) ?? -1;

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
    localStorage.setItem("station", current);
    render();
}

function nextStop() {
    current++;
    localStorage.setItem("station", current);
    render();
}

function resetGame() {
    localStorage.removeItem("station");
    current = -1;
    render();
}
