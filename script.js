const STOPS = [

{
title:"Orlen Český Brod",
icon:"⛽",
story:"Právě tady se naše cesty poprvé protnuly."
},

{
title:"Kavárna",
icon:"☕",
story:"Každé dobrodružství potřebuje zastávku na doplnění energie."
},

{
title:"Vyhlídka",
icon:"🌄",
story:"Někdy je potřeba zastavit a rozhlédnout se kolem sebe."
},

{
title:"Lesní cesta",
icon:"🌲",
story:"Ne všechny cesty jsou rovné. Ale právě to je dělá zajímavými."
},

{
title:"Místo vzpomínek",
icon:"📸",
story:"Každé místo skrývá nějaký příběh."
},

{
title:"Moto zastávka",
icon:"🏍️",
story:"Silnice pod koly. Vítr kolem helmy."
},

{
title:"Předposlední stopa",
icon:"🧭",
story:"Cíl už není daleko."
},

{
title:"Finální místo",
icon:"❤️",
story:"Poslední zastávka dnešního dobrodružství."
}

];

let current = 0;

render();

function render() {

  const content = document.getElementById("content");

  const stop = STOPS[current];

  content.innerHTML = `
    <div class="card">
        <h1>🏍️ Cesta za dary</h1>

        <h2>${stop.name}</h2>

        <p>${stop.story}</p>

        <button onclick="nextStop()">
            Další zastávka
        </button>

        <div class="progress">
            ${current + 1} / ${STOPS.length}
        </div>
    </div>
  `;
}

function nextStop() {

  current++;

  if (current >= STOPS.length) {

    document.getElementById("content").innerHTML = `
      <div class="card">
        <h1>❤️ Gratuluji</h1>
        <p>Dorazila jsi do cíle.</p>
      </div>
    `;

    return;
  }

  render();
}
