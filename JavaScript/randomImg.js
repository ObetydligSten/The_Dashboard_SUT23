
async function fetchRandomImage(){
    const apiKey = 'dBJ4ThILbJbRjIyw0P-pGmRH0kIMj_4MO-cz4Dozeh4';
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${apiKey}`);
    const data = await response.json();
    return data.urls.full;
}

async function setBackground(){
    const imgUrl = await fetchRandomImage();
    document.querySelector('body').style.backgroundImage = `url('${imgUrl}')`;
    document.querySelector('body').style.backgroundSize = `cover`;
    document.querySelector('body').style.backgroundPosition = `center`;


}

document.querySelector('.random').addEventListener('click', setBackground);