document.addEventListener("DOMContentLoaded", () => {
  const newsFeed = document.querySelector(".news-feed");
  const toggleViewBtn = document.getElementById("toggle-view");
  const sortSelect = document.getElementById("sort-select");
  const startDateInput = document.getElementById("start-date");
  const endDateInput = document.getElementById("end-date");


  toggleViewBtn.addEventListener("click", () => {
    newsFeed.classList.toggle("news-feed--slider");
    const isSlider = newsFeed.classList.contains("news-feed--slider");
    toggleViewBtn.querySelector("span").textContent = isSlider ? "Слайдер" : "Сетка";
    toggleViewBtn.querySelector("i").className = isSlider ? "fas fa-sliders-h" : "fas fa-th-large";

    if (isSlider) {
      initNewsSwiper();
    }
  });


  function initNewsSwiper() {
    if (window.newsSwiper) return;
    window.newsSwiper = new Swiper(".news-slider", {
      slidesPerView: 1,
      spaceBetween: 20,
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      loop: false,
      autoplay: false,
    });
  }


  function applyFilters() {
    const start = startDateInput.value ? new Date(startDateInput.value) : null;
    const end = endDateInput.value ? new Date(endDateInput.value) : null;
    const sortValue = sortSelect.value;

    const cards = Array.from(document.querySelectorAll(".news-card"));

    cards.forEach((card) => {
      const dateText = card.querySelector(".news-card__date")?.textContent;
      if (!dateText) return;

      const [day, month, year] = dateText.split(".").map(Number);
      const cardDate = new Date(year, month - 1, day);

      let visible = true;
      if (start && cardDate < start) visible = false;
      if (end && cardDate > end) visible = false;
      card.style.display = visible ? "" : "none";
    });


    const container = document.querySelector(".news-grid");
    const sorted = [...cards].sort((a, b) => {
      if (sortValue.includes("date")) {
        const da = a.querySelector(".news-card__date")?.textContent.split(".").reverse().join("");
        const db = b.querySelector(".news-card__date")?.textContent.split(".").reverse().join("");
        return sortValue === "date-asc" ? da.localeCompare(db) : db.localeCompare(da);
      }
      if (sortValue.includes("views")) {
        const va = parseInt(a.querySelector(".fa-eye")?.nextSibling.textContent.trim().replace(/\D/g, "")) || 0;
        const vb = parseInt(b.querySelector(".fa-eye")?.nextSibling.textContent.trim().replace(/\D/g, "")) || 0;
        return sortValue === "views-desc" ? vb - va : va - vb;
      }
      if (sortValue.includes("comments")) {
        const ca = parseInt(a.querySelector(".fa-comment")?.nextSibling.textContent.trim().replace(/\D/g, "")) || 0;
        const cb = parseInt(b.querySelector(".fa-comment")?.nextSibling.textContent.trim().replace(/\D/g, "")) || 0;
        return sortValue === "comments-desc" ? cb - ca : ca - cb;
      }
      return 0;
    });

    sorted.forEach((card) => container.appendChild(card));
  }

  [startDateInput, endDateInput, sortSelect].forEach((el) => {
    el.addEventListener("change", applyFilters);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("filter-modal");
  const openBtn = document.getElementById("filter-btn");
  const closeBtn = document.getElementById("close-filter");
  const applyBtn = document.getElementById("apply-filter");
  const resetBtn = document.getElementById("reset-filter");
  const checkboxes = modal.querySelectorAll("input[type='checkbox']");
  const newsCards = document.querySelectorAll(".news-card");


  openBtn.addEventListener("click", () => {
    modal.classList.add("open");
  });


  closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
  });
  modal.querySelector(".filter-modal__backdrop").addEventListener("click", () => {
    modal.classList.remove("open");
  });


  applyBtn.addEventListener("click", () => {
    const typeFilters = Array.from(checkboxes)
      .filter((ch) => ch.checked && ch.dataset.filter === "type")
      .map((ch) => ch.value);

    const statusFilters = Array.from(checkboxes)
      .filter((ch) => ch.checked && ch.dataset.filter === "status")
      .map((ch) => ch.value);

    newsCards.forEach((card) => {
      const category = card.querySelector(".news-card__category");
      const status = card.querySelector(".news-card__status");

      if (!category || !status) return;


      const matchType = typeFilters.length === 0 || typeFilters.some((t) => category.classList.contains(`category--${t}`));

    
      const matchStatus = statusFilters.length === 0 || statusFilters.some((s) => status.classList.contains(`status--${s}`));

      const isVisible = matchType && matchStatus;
      card.style.display = isVisible ? "" : "none";
    });

    modal.classList.remove("open");
  });


  resetBtn.addEventListener("click", () => {
    checkboxes.forEach((ch) => (ch.checked = false));
    newsCards.forEach((card) => (card.style.display = ""));
  });
});


document.addEventListener("click", (e) => {
  const label = e.target.closest(".md-checkbox");
  if (!label) return;

  const ripple = document.createElement("span");
  ripple.classList.add("ripple");

  const rect = label.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

  label.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
});

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".date-range-input");
  const popup = document.querySelector(".calendar-popup");
  const startDateInput = document.querySelector("#start-date");
  const endDateInput = document.querySelector("#end-date");
  const applyBtn = document.querySelector(".apply-dates");

  if (!input || !popup) return;


  input.addEventListener("click", (e) => {
    e.stopPropagation();
    popup.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!popup.contains(e.target) && e.target !== input) {
      popup.classList.add("hidden");
    }
  });


  applyBtn.addEventListener("click", () => {
    const start = startDateInput.value;
    const end = endDateInput.value;

    if (start && end) {
      const formatted = `${formatDate(start)} – ${formatDate(end)}`;
      input.value = formatted;
    }

    popup.classList.add("hidden");
  });


  startDateInput.addEventListener("change", () => {
    endDateInput.min = startDateInput.value;
  });

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
});

const picker = new Litepicker({
  element: document.getElementById("dateRange"),
  singleMode: false,
  numberOfMonths: 2,
  numberOfColumns: 2,
  format: "DD.MM.YYYY",
  autoApply: true,
  lang: "ru-RU",
  setup: (picker) => {

    picker.on("selected", (start, end) => {
      if (start && end) {
        console.log("Выбран диапазон дат:", {
          start: start.format("DD.MM.YYYY"),
          end: end.format("DD.MM.YYYY"),
        });
      } else if (start) {
        console.log("Выбрана дата:", start.format("DD.MM.YYYY"));
      }
    });
  },
});


function setPresetRange(range) {
  const now = new Date();
  let start, end;

  switch (range) {
    case "today":
      start = end = now;
      break;
    case "week":
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
      end = now;
      break;
    case "month":
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = now;
      break;
    case "year":
      start = new Date(now.getFullYear(), 0, 1);
      end = now;
      break;
    case "all":
      start = new Date(2000, 0, 1); // Можно выбрать минимальную дату
      end = now;
      break;
  }

  picker.setDateRange(start, end);


  console.log(`Выбран пресет "${range}":`, {
    start: start.toLocaleDateString("ru-RU"),
    end: end.toLocaleDateString("ru-RU"),
  });
}


document.querySelectorAll(".preset-buttons button").forEach((btn) => {
  btn.addEventListener("click", () => {
    setPresetRange(btn.dataset.range);
  });
});
