let notes = JSON.parse(localStorage.getItem('myNotes')) || [];

const render = () => {
    const list = document.getElementById('noteList');
    list.innerHTML = notes.map((n, i) => `
        <li class="todo-item">
            <span>${n}</span>
            <div>
                <button class="btn-edit" onclick="editNote(${i})">Edit</button>
                <button class="btn-delete" onclick="delNote(${i})">Hapus</button>
            </div>
        </li>`).join('');
    
    localStorage.setItem('myNotes', JSON.stringify(notes));
};

const addNote = () => {
    const inp = document.getElementById('noteInput');
    if (inp.value.trim()) { 
        notes.push(inp.value); 
        inp.value = ''; 
        render(); 
    }
};

const editNote = (i) => {
    const v = prompt("Edit tugas:", notes[i]);
    if (v !== null && v.trim()) { 
        notes[i] = v; 
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