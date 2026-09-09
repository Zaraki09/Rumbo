const data = {
  maldivas: {
    name: "Maldivas",
    country: "OCÉANO ÍNDICO · ASIA",
    image: "assets/maldivas.png",
    intro:
      "Una constelación de atolones donde los días transcurren entre lagunas imposibles y puestas de sol sobre el agua.",
    season: "Noviembre — abril",
    duration: "5 — 8 noches",
    style: "Descanso y buceo",
    tip: "Elige un atolón según lo que busques: arrecifes para bucear, islas locales para cultura o resorts privados para desconectar.",
    places: [
      [
        "Atolón Baa",
        "Reserva de la biosfera con mantarrayas y una de las mejores experiencias de snorkel del país.",
      ],
      ["Ari Sur", "Un paraíso submarino para nadar junto a tiburones ballena."],
      [
        "Isla de Maafushi",
        "Una mirada más local y asequible al ritmo de las Maldivas.",
      ],
    ],
  },
  kioto: {
    name: "Kioto",
    country: "JAPÓN · ASIA",
    image: "assets/kioto.png",
    intro:
      "Entre templos silenciosos, jardines precisos y callejones de madera, Kioto revela el Japón más íntimo.",
    season: "Marzo — mayo / octubre — noviembre",
    duration: "3 — 5 días",
    style: "Cultura y gastronomía",
    tip: "Empieza temprano: los templos y los senderos más populares muestran otra cara cuando aún no han llegado las multitudes.",
    places: [
      [
        "Fushimi Inari",
        "Camina bajo miles de torii vermellones hasta encontrar miradores tranquilos sobre la ciudad.",
      ],
      [
        "Kiyomizu-dera",
        "Un templo suspendido sobre la ladera, especialmente mágico con los arces de otoño.",
      ],
      [
        "Arashiyama",
        "Bosque de bambú, río Katsura y pequeños templos a los pies de las montañas.",
      ],
    ],
  },
  dolomitas: {
    name: "Dolomitas",
    country: "ITALIA · EUROPA",
    image: "assets/dolomitas.png",
    intro:
      "Picos de piedra clara, lagos glaciares y senderos que hacen que cualquier pausa parezca una postal.",
    season: "Junio — septiembre",
    duration: "4 — 7 días",
    style: "Naturaleza y aventura",
    tip: "Alquila coche: las rutas panorámicas y los refugios de montaña son parte esencial de la experiencia.",
    places: [
      [
        "Lago di Braies",
        "Agua esmeralda y un anfiteatro de picos que se refleja al amanecer.",
      ],
      [
        "Tre Cime di Lavaredo",
        "La caminata emblemática entre tres agujas rocosas monumentales.",
      ],
      [
        "Val Gardena",
        "Pueblos alpinos, teleféricos y acceso a panorámicas inolvidables.",
      ],
    ],
  },
  marrakech: {
    name: "Marrakech",
    country: "MARRUECOS · EUROPA",
    image: "assets/marrakech.png",
    intro:
      "Una ciudad de patios secretos, especias, azoteas y una energía que convierte cada paseo en descubrimiento.",
    season: "Marzo — mayo / octubre — noviembre",
    duration: "3 — 4 días",
    style: "Cultura y diseño",
    tip: "Reserva una tarde sin itinerario para perderte por la medina; es la forma más bonita de encontrar sus pequeños tesoros.",
    places: [
      [
        "Jemaa el-Fna",
        "La plaza que late al caer la tarde entre puestos, aromas y narradores.",
      ],
      [
        "Jardín Majorelle",
        "Un oasis azul intenso y vegetación exuberante en pleno corazón urbano.",
      ],
      [
        "Palacio de Bahía",
        "Mosaicos, madera tallada y patios que muestran el esplendor marroquí.",
      ],
    ],
  },
  amalfi: {
    name: "Amalfi",
    country: "ITALIA · EUROPA",
    image: "assets/amalfi.png",
    intro:
      "Pueblos de colores que se asoman al mar, limoneros y carreteras que doblan cada curva con una vista nueva.",
    season: "Mayo — junio / septiembre",
    duration: "3 — 5 días",
    style: "Costa y gastronomía",
    tip: "Explora por ferry: es más relajado que conducir y ofrece las mejores vistas de la costa desde el agua.",
    places: [
      [
        "Positano",
        "Escaleras, fachadas pastel y pequeñas playas escondidas bajo los acantilados.",
      ],
      [
        "Ravello",
        "Jardines en altura, villas históricas y panorámicas sobre el Tirreno.",
      ],
      [
        "Sendero de los Dioses",
        "Una ruta espectacular suspendida entre las montañas y el mar.",
      ],
    ],
  },
};
const key = new URLSearchParams(location.search).get("lugar") || "kioto";
const d = data[key] || data.kioto;
document.title = `${d.name} · Guía RUMBO`;
document.documentElement.style.setProperty("--image", `url("${d.image}")`);
["name", "country", "intro", "season", "duration", "style", "tip"].forEach(
  (id) => (document.querySelector(`#${id}`).textContent = d[id]),
);
document.querySelector("#places").innerHTML = d.places
  .map(
    (p, i) =>
      `<article class="place"><span>0${i + 1} — IMPRESCINDIBLE</span><h3>${p[0]}</h3><p>${p[1]}</p></article>`,
  )
  .join("");
document.querySelector("#year").textContent = new Date().getFullYear();
