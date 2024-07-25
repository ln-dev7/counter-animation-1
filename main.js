import "./style.scss";
import gsap from "gsap";

const minusButton = document.querySelector(".minus");
const plusButton = document.querySelector(".plus");
const box = document.querySelector(".box");
const counterContainer = document.querySelector(".counter-container");
const maxNumbersText = document.querySelector(".max-numbers");

const MAX_COUNT = 20;
const MIN_COUNT = 0;
let count = 0;

const animateOut = (element, direction, onComplete) => {
  gsap.to(element, {
    y: direction === 1 ? -30 : 30,
    opacity: 0,
    filter: "blur(4px)",
    duration: 0.15,
    onComplete,
  });
};

const animateIn = (element, direction) => {
  gsap.fromTo(
    element,
    { y: direction === 1 ? 30 : -30, opacity: 0, filter: "blur(4px)" },
    { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.15 }
  );
};

const updateCounterDisplay = (direction) => {
  const previousCount = counterContainer.textContent.trim();
  const newContent =
    count < 10
      ? `<span class="text-4xl font-medium w-7">${count}</span>`
      : `<span class="text-4xl font-medium w-7">${Math.floor(
          count / 10
        )}</span><span class="text-4xl font-medium w-7">${count % 10}</span>`;

  const prevLength = previousCount.length;
  const newLength = count.toString().length;

  const oldSpans = counterContainer.querySelectorAll("span");

  const onComplete = () => {
    counterContainer.innerHTML = newContent;
    const newSpans = counterContainer.querySelectorAll("span");

    if (prevLength === 1 && newLength > 1) {
      newSpans.forEach((span) => animateIn(span, direction));
    } else if (prevLength > 1 && newLength === 1) {
      animateIn(newSpans[0], direction);
    } else if (prevLength > 1 && newLength > 1) {
      const prevDecade = Math.floor((count - direction) / 10);
      const newDecade = Math.floor(count / 10);

      if (prevDecade !== newDecade) {
        newSpans.forEach((span) => animateIn(span, direction));
      } else {
        animateIn(newSpans[1], direction);
      }
    } else {
      newSpans.forEach((span) => animateIn(span, direction));
    }
  };

  if (prevLength === 1 && newLength > 1) {
    oldSpans.forEach((span) => animateOut(span, direction, onComplete));
  } else if (prevLength > 1 && newLength === 1) {
    oldSpans.forEach((span) => animateOut(span, direction, onComplete));
  } else if (prevLength > 1 && newLength > 1) {
    const prevDecade = Math.floor((count - direction) / 10);
    const newDecade = Math.floor(count / 10);

    if (prevDecade !== newDecade) {
      oldSpans.forEach((span) => animateOut(span, direction, onComplete));
    } else {
      animateOut(oldSpans[1], direction, onComplete);
    }
  } else {
    oldSpans.forEach((span) => animateOut(span, direction, onComplete));
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

const UpdateMaxNumbersText = () => {
  maxNumbersText.textContent = `${MAX_COUNT} is the max number.`;
};

document.addEventListener("DOMContentLoaded", () => {
  updateCounterDisplay(1);
  toggleButtonState();
  UpdateMaxNumbersText();
});
