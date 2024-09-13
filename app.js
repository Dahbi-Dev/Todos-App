const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

// Function to get todos from localStorage
const getTodosFromLocalStorage = () => {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};

// Function to save todos to localStorage
const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to generate the todo HTML template
const generateTemplate = (todo) => {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${todo}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `;
  list.innerHTML += html;
};

// Load todos from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const todos = getTodosFromLocalStorage();
  todos.forEach((todo) => generateTemplate(todo));
});

// Add new todos and save to localStorage
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();
  
  if (todo.length) {
    generateTemplate(todo);
    const todos = getTodosFromLocalStorage();
    todos.push(todo);
    saveTodosToLocalStorage(todos);
    addForm.reset();
  }
});

// Delete todos and update localStorage
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const todoText = e.target.previousElementSibling.textContent;
    e.target.parentElement.remove();

    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo !== todoText);
    saveTodosToLocalStorage(todos);
  }
});

// Filter todos based on search input
const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

// Keyup event for search
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
