const title = document.querySelector(".title h1");

console.dir(title);

title.innerText = "Hello!";

// function handleTitleClick() {
//   const currentColor = title.style.color;
//   let newColor;

//   if (currentColor === "blue") {
//     newColor = "tomato";
//   } else {
//     newColor = "blue";
//   }

//   title.style.color = newColor;
// }
// -> style은 css에서 정해주는게 좋다

function handleTitleClick() {
  // const clickedClass = "active";

  // if (title.classList.contains(clickedClass)) {
  //   title.classList.remove(clickedClass);
  // } else {
  //   title.classList.add(clickedClass);
  // }

  title.classList.toggle("active");
}

// function handleMouseEnter() {
//   title.innerText = "mouse is here!";
// }

// function handleMouseLeave() {
//   title.innerText = "mouse is gone!";
// }

// function handleWindowResize() {
//   document.body.style.backgroundColor = "tomato";
// }

// function handleWindowCopy() {
//   alert("copier!");
// }

// function handleWindowOffline() {
//   alert("SOS no WIFI");
// }

// function handleWindowOnline() {
//   alert("All GOOD");
// }

title.addEventListener("click", handleTitleClick); // == title.onclick = handleTitleClick;
//title.addEventListener("mouseenter", handleMouseEnter); // == title.onmouseenter = handleMouseEnter;
//title.addEventListener("mouseleave", handleMouseLeave); // == title.onmouseleave = handleMouseLeave;

// window.addEventListener("resize", handleWindowResize);
// window.addEventListener("copy", handleWindowCopy);
// window.addEventListener("offline", handleWindowOffline);
// window.addEventListener("online", handleWindowOnline);
