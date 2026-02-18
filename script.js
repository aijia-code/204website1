function $(s) { return document.querySelector(s); }

const hoursForm = $("#hoursForm");
const statusOutput = $("#statusOutput");
const timeOutput = $("#timeOutput");
const clearHours = $("#clearHours");

const HOURS = {
  texas_roadhouse: {
    name: "Texas Roadhouse",
    mon: "3:00 PM–10:00 PM",
    tue: "3:00 PM–10:00 PM",
    wed: "3:00 PM–10:00 PM",
    thu: "3:00 PM–10:00 PM",
    fri: "3:00 PM–11:00 PM",
    sat: "11:00 AM–11:00 PM",
    sun: "11:00 AM–10:00 PM"
  },

  peacemaker: {
    name: "Peacemaker Lobster & Crab",
    mon: "11:00 AM–2:00 PM, 4:30 PM–8:30 PM",
    tue: "11:00 AM–2:00 PM, 4:30 PM–8:30 PM",
    wed: "11:00 AM–2:00 PM, 4:30 PM–8:30 PM",
    thu: "11:00 AM–2:00 PM, 4:30 PM–8:30 PM",
    fri: "11:00 AM–2:00 PM, 4:30 PM–9:30 PM",
    sat: "11:00 AM–2:00 PM, 4:30 PM–9:30 PM",
    sun: "12:00 PM–8:30 PM"
  },

  pappys: {
    name: "Pappy's Smokehouse",
    mon: "11:00 AM–4:00 PM",
    tue: "closed",
    wed: "11:00 AM–4:00 PM",
    thu: "11:00 AM–6:00 PM",
    fri: "11:00 AM–7:00 PM",
    sat: "11:00 AM–7:00 PM",
    sun: "11:00 AM–4:00 PM"
  },

  kitchen95: {
    name: "Kitchen 95",
    mon: "12:00 PM–3:00 PM, 5:00 PM–8:00 PM",
    tue: "12:00 PM–3:00 PM, 5:00 PM–8:00 PM",
    wed: "closed",
    thu: "12:00 PM–3:00 PM, 5:00 PM–8:00 PM",
    fri: "12:00 PM–3:00 PM, 5:00 PM–8:00 PM",
    sat: "12:00 PM–3:00 PM, 5:00 PM–8:00 PM",
    sun: "12:00 PM–3:00 PM, 5:00 PM–8:00 PM"
  },

  chilispot: {
    name: "ChiliSpot",
    mon: "11:30 AM–2:30 PM, 4:30 PM–8:30 PM",
    tue: "11:30 AM–2:30 PM, 4:30 PM–8:30 PM",
    wed: "11:30 AM–2:30 PM, 4:30 PM–8:30 PM",
    thu: "11:30 AM–2:30 PM, 4:30 PM–8:30 PM",
    fri: "11:00 AM–2:30 PM, 4:30 PM–9:30 PM",
    sat: "11:00 AM–9:30 PM",
    sun: "11:00 AM–8:30 PM"
  },

  menyarui: {
    name: "Menya Rui",
    mon: "closed",
    tue: "closed",
    wed: "5:00 PM–10:00 PM",
    thu: "5:00 PM–10:00 PM",
    fri: "5:00 PM–10:00 PM",
    sat: "5:00 PM–10:00 PM",
    sun: "5:00 PM–10:00 PM"
  },

  kpot: {
    name: "KPOT Korean BBQ & Hot Pot",
    mon: "11:30 AM–9:30 PM",
    tue: "11:30 AM–9:30 PM",
    wed: "11:30 AM–9:30 PM",
    thu: "11:30 AM–9:30 PM",
    fri: "12:00 PM–10:00 PM",
    sat: "12:00 PM–10:00 PM",
    sun: "11:30 AM–9:30 PM"
  },

  mailee: {
    name: "Mai Lee",
    mon: "closed",
    tue: "11:00 AM–9:00 PM",
    wed: "11:00 AM–9:00 PM",
    thu: "11:00 AM–9:00 PM",
    fri: "11:00 AM–9:00 PM",
    sat: "11:00 AM–9:00 PM",
    sun: "11:00 AM–9:00 PM"
  },

  louie: {
    name: "Louie",
    mon: "5:00 PM–10:00 PM",
    tue: "5:00 PM–10:00 PM",
    wed: "5:00 PM–10:00 PM",
    thu: "5:00 PM–10:00 PM",
    fri: "5:00 PM–11:00 PM",
    sat: "5:00 PM–11:00 PM",
    sun: "closed"
  },

  trattoria_marcella: {
    name: "Trattoria Marcella",
    mon: "closed",
    tue: "5:00 PM–8:30 PM",
    wed: "5:00 PM–8:30 PM",
    thu: "5:00 PM–8:30 PM",
    fri: "5:00 PM–9:30 PM",
    sat: "5:00 PM–9:30 PM",
    sun: "closed"
  }
};

function dayLabel(dayKey) {
  return {
    mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday",
    fri: "Friday", sat: "Saturday", sun: "Sunday"
  }[dayKey] || dayKey;
}

if (hoursForm && statusOutput && timeOutput) {
  hoursForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const restKey = $("#restaurant")?.value;
    const dayKey = $("#weekday")?.value;

    if (!restKey || !dayKey) {
      statusOutput.classList.remove("open", "closed");
      statusOutput.textContent = "Please select a restaurant and a day.";
      timeOutput.textContent = "";
      return;
    }

    const rest = HOURS[restKey];
    const hours = rest?.[dayKey];
    const dayText = dayLabel(dayKey);

    if (!rest || !hours) {
      statusOutput.classList.remove("open", "closed");
      statusOutput.textContent = "No data found.";
      timeOutput.textContent = "";
      return;
    }

    statusOutput.classList.remove("open", "closed");

    if (hours === "closed") {
      statusOutput.textContent = `${rest.name} is CLOSED on ${dayText}.`;
      statusOutput.classList.add("closed");
      timeOutput.textContent = "";
    } else {
      statusOutput.textContent = `${rest.name} is OPEN on ${dayText}.`;
      statusOutput.classList.add("open");
      timeOutput.textContent = `Hours: ${hours}`;
    }
  });
}

if (clearHours) {
  clearHours.addEventListener("click", () => {
    hoursForm?.reset();
    statusOutput.classList.remove("open", "closed");
    statusOutput.textContent = "Pick a restaurant + day, then click “Check”.";
    timeOutput.textContent = "";
  });
}


const toTop = $("#toTop");

function updateToTop() {
  if (!toTop) return;
  toTop.classList.toggle("show", window.scrollY > 450);
}

window.addEventListener("scroll", updateToTop);
updateToTop();

if (toTop) {
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
