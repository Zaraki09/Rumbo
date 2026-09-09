(() => {
  const destinations = [
    {
      id: "maldivas",
      name: "Maldivas",
      country: "Maldivas",
      category: "asia",
      label: "Asia",
      description: "Atolones de aguas turquesas, descanso y buceo.",
      image: "assets/maldivas.png",
    },
    {
      id: "kioto",
      name: "Kioto",
      country: "Japón",
      category: "asia",
      label: "Asia",
      description: "Templos, jardines y tradición en el Japón más íntimo.",
      image: "assets/kioto.png",
    },
    {
      id: "dolomitas",
      name: "Dolomitas",
      country: "Italia",
      category: "europa",
      label: "Europa",
      description: "Picos luminosos y rutas inolvidables entre lagos alpinos.",
      image: "assets/dolomitas.png",
    },
    {
      id: "marrakech",
      name: "Marrakech",
      country: "Marruecos",
      category: "europa",
      label: "Europa",
      description:
        "Color, patios secretos y sabores que despiertan los sentidos.",
      image: "assets/marrakech.png",
    },
    {
      id: "amalfi",
      name: "Amalfi",
      country: "Italia",
      category: "europa",
      label: "Europa",
      description: "Costa mediterránea, limoneros y pueblos frente al mar.",
      image: "assets/amalfi.png",
    },
  ];
  const storageKey = "rumbo-favorites";
  const cookieKey = "rumbo-cookie-preferences";
  const grid = document.querySelector("#destinationsGrid");
  const favoritesGrid = document.querySelector("#favoritesGrid");
  const emptyFavorites = document.querySelector("#emptyFavorites");
  const search = document.querySelector("#destinationSearch");
  const filters = document.querySelector("#filters");
  const noResults = document.querySelector("#noResults");
  const resultsStatus = document.querySelector("#resultsStatus");
  let activeFilter = "all";

  const getFavorites = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch {
      return [];
    }
  };
  const setFavorites = (values) =>
    localStorage.setItem(storageKey, JSON.stringify([...new Set(values)]));
  const escapeHTML = (value) =>
    value.replace(
      /[&<>'"]/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[char],
    );
  function card(destination) {
    const isFavorite = getFavorites().includes(destination.id);
    return `<article class="destination-card" style="--image:url('${destination.image}')"><button class="favorite-button" type="button" data-favorite="${destination.id}" aria-label="${isFavorite ? "Quitar" : "Añadir"} ${escapeHTML(destination.name)} ${isFavorite ? "de favoritos" : "a favoritos"}" aria-pressed="${isFavorite}">♥</button><small>${destination.label.toUpperCase()} · ${escapeHTML(destination.country.toUpperCase())}</small><h3>${escapeHTML(destination.name)}</h3><p>${escapeHTML(destination.description)}</p><a class="button" href="destino.html?lugar=${encodeURIComponent(destination.id)}">Ver destino →</a></article>`;
  }
  function renderDestinations() {
    const term = search.value.trim().toLocaleLowerCase("es");
    const cards = [...grid.querySelectorAll("[data-id]")];
    const visibleCards = cards.filter((destinationCard) => {
      const destination = destinations.find(
        (item) => item.id === destinationCard.dataset.id,
      );
      if (!destination) return false;
      const matchesCategory =
        activeFilter === "all" ||
        destinationCard.dataset.category === activeFilter;
      const searchableText =
        `${destination.name} ${destination.country} ${destination.category} ${destination.label}`.toLocaleLowerCase(
          "es",
        );
      return matchesCategory && searchableText.includes(term);
    });
    cards.forEach((destinationCard) => {
      destinationCard.hidden = !visibleCards.includes(destinationCard);
    });
    noResults.hidden = visibleCards.length !== 0;
    resultsStatus.textContent = visibleCards.length
      ? `${visibleCards.length} destino${visibleCards.length === 1 ? "" : "s"} disponible${visibleCards.length === 1 ? "" : "s"}`
      : "Sin destinos disponibles para esta selección";
  }
  function renderFavorites() {
    const favoriteIds = getFavorites();
    const favoriteDestinations = destinations.filter((d) =>
      favoriteIds.includes(d.id),
    );
    favoritesGrid.innerHTML = favoriteDestinations.map(card).join("");
    document
      .querySelectorAll("#destinationsGrid [data-id]")
      .forEach((destinationCard) => {
        const id = destinationCard.dataset.id;
        const isFavorite = favoriteIds.includes(id);
        const button = destinationCard.querySelector("[data-favorite]");
        button.setAttribute("aria-pressed", String(isFavorite));
        button.setAttribute(
          "aria-label",
          `${isFavorite ? "Quitar" : "Añadir"} ${destinationCard.querySelector("h3").textContent} ${isFavorite ? "de favoritos" : "a favoritos"}`,
        );
      });
    emptyFavorites.hidden = favoriteDestinations.length > 0;
    const count = document.querySelector("#favoritesCount");
    count.textContent = favoriteIds.length;
    count.setAttribute("aria-label", `${favoriteIds.length} favoritos`);
  }
  function refresh() {
    renderDestinations();
    renderFavorites();
  }
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-favorite]");
    if (!button) return;
    const id = button.dataset.favorite;
    const favorites = getFavorites();
    setFavorites(
      favorites.includes(id)
        ? favorites.filter((item) => item !== id)
        : [...favorites, id],
    );
    refresh();
  });
  search.addEventListener("input", renderDestinations);
  filters.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    activeFilter = button.dataset.filter;
    filters
      .querySelectorAll("button")
      .forEach((item) => item.classList.toggle("active", item === button));
    renderDestinations();
  });
  const menuBtn = document.querySelector("#menuBtn");
  const menu = document.querySelector("#menu");
  menuBtn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      menu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
  document.querySelector("#year").textContent = new Date().getFullYear();

  const banner = document.querySelector("#cookieBanner");
  const modal = document.querySelector("#cookieModal");
  const analytics = document.querySelector("#analyticsCookies");
  const readPrefs = () => {
    try {
      return JSON.parse(localStorage.getItem(cookieKey));
    } catch {
      return null;
    }
  };
  const savePrefs = (preferences) => {
    localStorage.setItem(
      cookieKey,
      JSON.stringify({ ...preferences, date: new Date().toISOString() }),
    );
    banner.hidden = true;
    modal.hidden = true;
  };
  const preferences = readPrefs();
  if (!preferences) banner.hidden = false;
  else analytics.checked = Boolean(preferences.analytics);
  document
    .querySelector("#cookieAccept")
    .addEventListener("click", () =>
      savePrefs({ necessary: true, analytics: true }),
    );
  document
    .querySelector("#cookieReject")
    .addEventListener("click", () =>
      savePrefs({ necessary: true, analytics: false }),
    );
  document.querySelector("#cookieConfigure").addEventListener("click", () => {
    banner.hidden = true;
    modal.hidden = false;
  });
  document.querySelector("#cookieSettings").addEventListener("click", () => {
    const saved = readPrefs();
    analytics.checked = Boolean(saved?.analytics);
    modal.hidden = false;
  });
  document.querySelector("#closeCookieModal").addEventListener("click", () => {
    modal.hidden = true;
    if (!readPrefs()) banner.hidden = false;
  });
  document
    .querySelector("#saveCookieSettings")
    .addEventListener("click", () =>
      savePrefs({ necessary: true, analytics: analytics.checked }),
    );
  refresh();
})();
