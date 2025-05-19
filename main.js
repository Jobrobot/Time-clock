document.addEventListener("DOMContentLoaded", () => {
  const strips = [...document.querySelectorAll(".strip")];
  const numberSize = 9;

  function highlight(strip, d) {
    const stripElem = strips[strip];
    if (!stripElem) return;
    const numberElem = stripElem.querySelector(`.number:nth-of-type(${d + 1})`);
    if (!numberElem) return;
    numberElem.classList.add("pop");

    setTimeout(() => {
      numberElem.classList.remove("pop");
    }, 950);
  }

  function stripSplider(strip, number) {
    let d1 = Math.floor(number / 10);
    let d2 = number % 10;

    if (strips[strip]) {
      strips[strip].style.transform = `translateY(${d1 * -numberSize}vmin)`;
      highlight(strip, d1);
    }
    if (strips[strip + 1]) {
      strips[strip + 1].style.transform = `translateY(${d2 * -numberSize}vmin)`;
      highlight(strip + 1, d2);
    }
  }

  setInterval(() => {
    const time = new Date();

    const hours = time.getHours();
    const mins = time.getMinutes();
    const secs = time.getSeconds();

    stripSplider(0, hours);
    stripSplider(2, mins);
    stripSplider(4, secs);
  }, 1000);
});

let darkmode = localStorage.getItem("darkmode");
const themeSwither = document.getElementById("theme-switch");

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active"); // fixed: should be "active", not undefined variable
};

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", "null"); // fixed: store string "null"
};

// Initialize theme based on stored preference
if (darkmode === "active") {
  enableDarkmode();
} else {
  disableDarkmode();
}

themeSwither.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});
