const STOPS = [
  {
    name: "Orlen Český Brod",
    story: "Právě tady se naše cesty poprvé protnuly."
  },
  {
    name: "Stanice 2",
    story: "Každé dobrodružství začíná prvním krokem."
  },
  {
    name: "Stanice 3",
    story: "Další část příběhu čeká za další zatáčkou."
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
