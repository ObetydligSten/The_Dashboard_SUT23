
const editTitle = document.getElementById('title');

editTitle.addEventListener('click', function(){
    editTitle.contentEditable = 'true';

    editTitle.addEventListener('blur', function(){
        localStorage.setItem('rubrik', editTitle.innerText);

        editTitle.contentEditable = 'false';
    });
});

window.addEventListener('load', function(){
    const savedTitle = this.localStorage.getItem('rubrik');
    if(savedTitle) {
        editTitle.innerText = savedTitle;
    }
});