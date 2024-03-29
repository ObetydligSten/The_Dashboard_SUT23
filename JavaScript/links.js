function addLink(){
    document.getElementById('add').addEventListener('click', function(){
        var link = prompt("Skriv in URL:");
                var title = prompt("Skriv in titel:");
        var linksContainer = document.getElementById('linksContainer');
    
        if (link && title) { 
            var linksContainer = document.getElementById('linksContainer');
            
            title = title.toLowerCase();
            var newLinkHTML = `<div class="links">
                <a href="${link}" target="_blank">
                    <i class="fab fa-${title}"></i>
                    <p>${title[0].toUpperCase() + title.slice(1)}</p>
                </a>
                <i class="fa fa-minus-circle remove" aria-hidden="true"></i>
            </div>`;
            
            linksContainer.innerHTML += newLinkHTML;

            saveLinksToLocalStorage(linksContainer.innerHTML);
        } else {
            alert("Skriv in både URL och Titel");
        }
    });
}

addLink();

document.getElementById('linksContainer').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove')) {
        event.target.parentElement.remove();

        saveLinksToLocalStorage(document.getElementById('linksContainer').innerHTML);
    }
});


function saveLinksToLocalStorage(linksHTML) {
    localStorage.setItem('savedLinks', linksHTML);
}

function loadLinksFromLocalStorage() {
    var savedLinks = localStorage.getItem('savedLinks');
    if (savedLinks) {
        var linksContainer = document.getElementById('linksContainer');
        linksContainer.innerHTML = savedLinks;
    }
}

window.onload = function() {
    loadLinksFromLocalStorage();
};
