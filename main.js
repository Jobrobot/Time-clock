document.addEventListener("DOMContentLoaded", () => {
  const strips = [...document.querySelectorAll(".strip")];
  const numberSize = 9;

  // Track previous digits to know when they change
  let prevDigits = Array(6).fill(null);

  function updateHighlight(strip, d, prevD) {
    const stripElem = strips[strip];
    if (!stripElem) return;

    // Remove pop from previous digit
    if (prevD !== null) {
      const prevElem = stripElem.querySelector(
        `.number:nth-of-type(${prevD + 1})`
      );
      if (prevElem) prevElem.classList.remove("pop");
    }

    // Add pop to current digit
    const numberElem = stripElem.querySelector(`.number:nth-of-type(${d + 1})`);
    if (numberElem) numberElem.classList.add("pop");
  }

  function stripSplider(strip, number, index) {
    const d1 = Math.floor(number / 10);
    const d2 = number % 10;

    if (strips[strip]) {
      strips[strip].style.transform = `translateY(${d1 * -numberSize}vmin)`;
      if (prevDigits[index] !== d1) {
        updateHighlight(strip, d1, prevDigits[index]);
        prevDigits[index] = d1;
      }
    }

    if (strips[strip + 1]) {
      strips[strip + 1].style.transform = `translateY(${d2 * -numberSize}vmin)`;
      if (prevDigits[index + 1] !== d2) {
        updateHighlight(strip + 1, d2, prevDigits[index + 1]);
        prevDigits[index + 1] = d2;
      }
    }
  }

  // Initial call to set correct pop classes on load
  function initializeTime() {
    const time = new Date();
    const hours = time.getHours();
    const mins = time.getMinutes();
    const secs = time.getSeconds();

    const d = [
      Math.floor(hours / 10),
      hours % 10,
      Math.floor(mins / 10),
      mins % 10,
      Math.floor(secs / 10),
      secs % 10,
    ];

    d.forEach((digit, i) => {
      prevDigits[i] = digit;
      const stripIndex = i;
      const stripElem = strips[stripIndex];
      if (stripElem) {
        stripElem.style.transform = `translateY(${digit * -numberSize}vmin)`;
        const numElem = stripElem.querySelector(
          `.number:nth-of-type(${digit + 1})`
        );
        if (numElem) numElem.classList.add("pop");
      }
    });
  }

  initializeTime();

  setInterval(() => {
    const time = new Date();
    const hours = time.getHours();
    const mins = time.getMinutes();
    const secs = time.getSeconds();

    stripSplider(0, hours, 0);
    stripSplider(2, mins, 2);
    stripSplider(4, secs, 4);
  }, 1000);
});

// Dark mode toggle
let darkmode = localStorage.getItem("darkmode");
const themeSwither = document.getElementById("theme-switch");

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", "null");
};

if (darkmode === "active") {
  enableDarkmode();
} else {
  disableDarkmode();
}

themeSwither.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});
