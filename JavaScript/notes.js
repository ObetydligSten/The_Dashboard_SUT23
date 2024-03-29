const noteSave = document.getElementById('notes');

noteSave.addEventListener('input', function(){
    localStorage.setItem('saveNotes', noteSave.value);
});

window.addEventListener('load', function(){
    const savedNote = localStorage.getItem('saveNotes');

    if(savedNote) {
        noteSave.value = savedNote;
    }
});