const formBox = document.querySelector(".form-box");
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const todoForm = document.querySelector("#todo-form");
const todoWrap = document.querySelector(".todo-list-wrap");
const todoList = document.querySelector("#todo-list");

const HIDDEN_CLASSNAME = "hidden";
const ON_CLASSNAME = "off";
const ACTIVE_CLASSNAME = "active";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault();
  formBox.classList.add(ACTIVE_CLASSNAME);

  loginForm.classList.add(HIDDEN_CLASSNAME);
  const userName = loginInput.value;
  localStorage.setItem(USERNAME_KEY, userName);
  paintGreeting(userName);

  todoForm.classList.remove(HIDDEN_CLASSNAME);
  todoWrap.classList.remove(ON_CLASSNAME);
}

function paintGreeting(userName) {
  greeting.innerText = `Hello! ${userName}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

console.log(savedUsername);

if (savedUsername === null) {
  // show the form
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);

  formBox.classList.remove(ACTIVE_CLASSNAME);
  todoForm.classList.add(HIDDEN_CLASSNAME);
  todoWrap.classList.add(ON_CLASSNAME);
} else {
  // show the greetings
  paintGreeting(savedUsername);

  formBox.classList.add(ACTIVE_CLASSNAME);
  todoForm.classList.remove(HIDDEN_CLASSNAME);
  todoWrap.classList.remove(ON_CLASSNAME);
}
