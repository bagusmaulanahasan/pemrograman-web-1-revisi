const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// 1. Muat data dari LocalStorage saat halaman dibuka
document.addEventListener('DOMContentLoaded', getTodos);

// 2. Fungsi Menambah Tugas
addBtn.addEventListener('click', () => {
    if (input.value === '') return;
    saveLocalTodo(input.value);
    renderTodo(input.value);
    input.value = '';
});

function renderTodo(text) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `
        <span>${text}</span>
        <div class="btn-group">
            <button class="edit-btn" onclick="editTodo(this)">Edit</button>
            <button class="delete-btn" onclick="deleteTodo(this)">Hapus</button>
        </div>
    `;
    todoList.appendChild(li);
}

// 3. Fungsi Menghapus Tugas
function deleteTodo(button) {
    const item = button.parentElement.parentElement;
    removeLocalTodo(item.children[0].innerText);
    item.remove();
}

// 4. Fungsi Mengedit Tugas (Menggunakan Prompt sesuai gambar)
function editTodo(button) {
    const item = button.parentElement.parentElement;
    const oldText = item.children[0].innerText;
    const newText = prompt("Edit tugas:", oldText);
    
    if (newText !== null && newText !== "") {
        item.children[0].innerText = newText;
        updateLocalTodo(oldText, newText);
    }
}

// --- FUNGSI LOCAL STORAGE ---

function saveLocalTodo(todo) {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.forEach(todo => renderTodo(todo));
}

function removeLocalTodo(todoText) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    const filteredTodos = todos.filter(t => t !== todoText);
    localStorage.setItem('todos', JSON.stringify(filteredTodos));
}

function updateLocalTodo(oldText, newText) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    const index = todos.indexOf(oldText);
    if (index !== -1) todos[index] = newText;
    localStorage.setItem('todos', JSON.stringify(todos));
}