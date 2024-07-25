import "./style.scss";
import gsap from "gsap";

const minusButton = document.querySelector(".minus");
const plusButton = document.querySelector(".plus");
const box = document.querySelector(".box");
const counterContainer = document.querySelector(".counter-container");

const MAX_COUNT = 20;
const MIN_COUNT = 0;
let count = 0;

const updateCounterDisplay = (direction) => {
  const previousCount = counterContainer.textContent.trim();
  const newContent =
    count < 10
      ? `<span class="text-4xl font-medium w-7">${count}</span>`
      : `<span class="text-4xl font-medium w-7">${Math.floor(
          count / 10
        )}</span><span class="text-4xl font-medium w-7">${count % 10}</span>`;

  counterContainer.innerHTML = newContent;

  const spans = counterContainer.querySelectorAll("span");
  const prevLength = previousCount.length;
  const newLength = count.toString().length;

  if (prevLength === 1 && newLength > 1) {
    spans.forEach((span) => {
      gsap.fromTo(
        span,
        { y: direction === 1 ? 30 : -30, opacity: 0, filter: "blur(4px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.2 }
      );
    });
  } else if (prevLength > 1 && newLength === 1) {
    gsap.fromTo(
      counterContainer,
      { y: direction === 1 ? 30 : -30, opacity: 0, filter: "blur(4px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.2 }
    );
  } else if (prevLength > 1 && newLength > 1) {
    const lastDigit = spans[1];
    gsap.fromTo(
      lastDigit,
      { y: direction === 1 ? 30 : -30, opacity: 0, filter: "blur(4px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.2 }
    );
  } else {
    spans.forEach((span) => {
      gsap.fromTo(
        span,
        { y: direction === 1 ? 30 : -30, opacity: 0, filter: "blur(4px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.2 }
      );
    });
  }
};

const toggleButtonState = () => {
  minusButton.classList.toggle("disabled", count === MIN_COUNT);
  plusButton.classList.toggle("disabled", count === MAX_COUNT);
};

const addBounceEffect = (element) => {
  gsap.fromTo(
    box,
    { x: 0 },
    {
      x: 5,
      duration: 0.05,
      yoyo: true,
      repeat: 5,
      onComplete: () => gsap.to(box, { x: 0 }),
    }
  );
};

minusButton.addEventListener("click", () => {
  if (!minusButton.classList.contains("disabled")) {
    count = Math.max(MIN_COUNT, count - 1);
    updateCounterDisplay(-1);
    toggleButtonState();
  } else {
    addBounceEffect(minusButton);
  }
});

plusButton.addEventListener("click", () => {
  if (!plusButton.classList.contains("disabled")) {
    count = Math.min(MAX_COUNT, count + 1);
    updateCounterDisplay(1);
    toggleButtonState();
  } else {
    addBounceEffect(plusButton);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  updateCounterDisplay(1);
  toggleButtonState();
});
