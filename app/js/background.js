const bg = document.querySelector(".bg");
const images = ["0.jpg", "1.jpg", "2.jpg"];

const snowImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/${snowImage}`;
console.log(bgImage);

bg.appendChild(bgImage);
