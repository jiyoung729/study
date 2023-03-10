const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); // string์ผ๋ก ๋ณํ
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveTodos();
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "๐";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);

  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  //console.log(toDoInput.value);
  const newTodo = toDoInput.value;
  toDoInput.value = ""; // input ๊ฐ์ ๋น์ฐ๊ธฐ
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
}

// forEach ๋ถ๋ถ๊ณผ ๋์ผ
// function sayHello(item) {
//   console.log("this is turn of", item);
// }

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
console.log(savedToDos);

if (savedToDos !== null) {
  const parseTodo = JSON.parse(savedToDos); // ๋ฐฐ์ด๋ก ๋ง๋๋
  //console.log(parseTodo);
  toDos = parseTodo;
  parseTodo.forEach(paintTodo);
}
