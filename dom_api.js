// -------------------
// Part 1: setTimeout
// -------------------
console.log("First message");

setTimeout(() => {
  console.log("Second message (after 2 seconds)");
}, 2000);

console.log("Third message");

// -------------------
// Part 2: Promises (Advice API)
// -------------------
fetch("https://api.adviceslip.com/advice")
  .then(res => res.json())
  .then(data => {
    console.log("Advice (with Promises): " + data.slip.advice);
  });

// -------------------
// Part 3: Async/Await (Advice API)
// -------------------
async function getAdviceAsync() {
  let res = await fetch("https://api.adviceslip.com/advice");
  let data = await res.json();
  console.log("Advice (with Async/Await): " + data.slip.advice);
}
getAdviceAsync();

// -------------------
// Part 4A: Dog Viewer with Button
// -------------------
async function getDog() {
  let res = await fetch("https://dog.ceo/api/breeds/image/random");
  let data = await res.json();
  document.getElementById("dogImg").src = data.message;
}
document.getElementById("newDogBtn").addEventListener("click", getDog);
getDog(); // load first dog on page load

// -------------------
// Part 4B: Dog API Auto Slider
// -------------------
async function loadDogs() {
  let res = await fetch("https://dog.ceo/api/breeds/image/random/5");
  let data = await res.json();

  const slider = document.getElementById("slider");
  slider.innerHTML = "";

  data.message.forEach(url => {
    const slide = document.createElement("div");
    slide.classList.add("slide");

    const img = document.createElement("img");
    img.src = url;

    slide.appendChild(img);
    slider.appendChild(slide);
  });

  startAutoSlide();
}

function startAutoSlide() {
  const slider = document.getElementById("slider");
  let currentIndex = 0;
  const slideCount = slider.children.length;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slideCount;

    gsap.to(slider, {
      x: -220 * currentIndex,
      duration: 1,
      ease: "power2.inOut"
    });
  }, 3000);
}

loadDogs();
