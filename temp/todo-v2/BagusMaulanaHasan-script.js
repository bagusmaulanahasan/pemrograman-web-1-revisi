let notes = JSON.parse(localStorage.getItem('myNotes')) || [];

notes = notes.map(n => (typeof n === 'string' ? { text: n, done: false } : n));

const save = () => localStorage.setItem('myNotes', JSON.stringify(notes));

const render = () => {
    const list = document.getElementById('noteList');
    list.innerHTML = notes.map((n, i) => `
        <li class="todo-item ${n.done ? 'done' : ''}">
            <span class="todo-text">${n.text}</span>
            <div class="todo-actions">
                <button class="btn-check ${n.done ? 'checked' : ''}" onclick="toggleDone(${i})" title="${n.done ? 'Batalkan' : 'Selesai'}">
                    ${n.done ? '✓' : '✓'}
                </button>
                <button class="btn-edit" onclick="editNote(${i})">Edit</button>
                <button class="btn-delete" onclick="delNote(${i})">Hapus</button>
            </div>
        </li>`).join('');

    save();
};

const toggleDone = (i) => {
    notes[i].done = !notes[i].done;
    render();
};

const addNote = () => {
    const inp = document.getElementById('noteInput');
    if (inp.value.trim()) {
        notes.push({ text: inp.value.trim(), done: false });
        inp.value = '';
        render();
    }
};

const editNote = (i) => {
    const v = prompt("Edit tugas:", notes[i].text);
    if (v !== null && v.trim()) {
        notes[i].text = v.trim();
        render();
    }
};

const delNote = (i) => {
    if (confirm("Hapus tugas ini?")) {
        notes.splice(i, 1);
        render();
    }
};

render();