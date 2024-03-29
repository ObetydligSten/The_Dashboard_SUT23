
function getWeather(latitude, longitude){

    const rLongitude = longitude.toFixed(5);
    const rLatitude = latitude.toFixed(5);

    const apiUrl = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${rLongitude}/lat/${rLatitude}/data.json`;
    const testUrl = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/16.158/lat/58.5812/data.json`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate()+1);
        const inTwoDays = new Date(today);
        inTwoDays.setDate(today.getDate()+2);
        const inThreeDays = new Date(today);
        inThreeDays.setDate(today.getDate()+3);

        const date = `${today.getDate()} ${getMonthName(today.getMonth())} ${today.getFullYear()}`;
        const date2 = `${tomorrow.getDate()} ${getMonthName(tomorrow.getMonth())} ${tomorrow.getFullYear()}`;
        const date3 = `${inTwoDays.getDate()} ${getMonthName(inTwoDays.getMonth())} ${inTwoDays.getFullYear()}`;
        const date4 = `${inThreeDays.getDate()} ${getMonthName(inThreeDays.getMonth())} ${inThreeDays.getFullYear()}`;


        const tomorrowDateString = tomorrow.toISOString().split('T')[0];
        const inTwoDaysDateString = inTwoDays.toISOString().split('T')[0];
        const inThreeDaysDateString = inThreeDays.toISOString().split('T')[0];


        const tomorrowDate = new Date(`${tomorrowDateString}T12:00:00Z`);
        
        const tomorrowIndex = data.timeSeries.findIndex(entry => {
            const entryDate = new Date(entry.validTime);
            return entryDate.getTime() === tomorrowDate.getTime();
        });

        const inTwoDaysDate = new Date(`${inTwoDaysDateString}T12:00:00Z`);
        
        const inTwoDaysIndex = data.timeSeries.findIndex(entry => {
            const entryDate = new Date(entry.validTime);
            return entryDate.getTime() === inTwoDaysDate.getTime();
        });

        const inThreeDaysDate = new Date(`${inThreeDaysDateString}T12:00:00Z`);
        
        const inThreeDaysIndex = data.timeSeries.findIndex(entry => {
            const entryDate = new Date(entry.validTime);
            return entryDate.getTime() === inThreeDaysDate.getTime();
        });


        // Hämta dagens väder
        const currentWeather = data.timeSeries[0].parameters.find(param => param.name === 't').values[0];
        const weatherSymbolCode = data.timeSeries[0].parameters.find(param => param.name === 'Wsymb2').values[0];

        const tomorrowWeather = data.timeSeries[tomorrowIndex].parameters.find(param => param.name === 't').values[0];
        const tomorrowWeatherSymbolCode = data.timeSeries[tomorrowIndex].parameters.find(param => param.name === 'Wsymb2').values[0];

        const inTwoDaysWeather = data.timeSeries[inTwoDaysIndex].parameters.find(param => param.name === 't').values[0];
        const inTwoDaysWeatherSymbolCode = data.timeSeries[inTwoDaysIndex].parameters.find(param => param.name === 'Wsymb2').values[0];

        const inThreeDaysWeather = data.timeSeries[inThreeDaysIndex].parameters.find(param => param.name === 't').values[0];
        const inThreeDaysWeatherSymbolCode = data.timeSeries[inThreeDaysIndex].parameters.find(param => param.name === 'Wsymb2').values[0];


        // Avkoda vädersymbolen till ett förståeligt format
        const weatherSymbol = decodeWeatherSymbol(weatherSymbolCode);
        const tomorrowWeatherSymbol = decodeWeatherSymbol(tomorrowWeatherSymbolCode);
        const inTwoDaysWeatherSymbol = decodeWeatherSymbol(inTwoDaysWeatherSymbolCode);
        const inThreeDaysWeatherSymbol = decodeWeatherSymbol(inThreeDaysWeatherSymbolCode);



        // Skapa HTML för att visa väderinformationen
        const weatherHTML = 
            `<h3>Just nu: ${date}</h3>
            <p>${currentWeather} °C</p>
            <p>${weatherSymbol}</p>`;

        const weather2HTML = 
            `<h3>Imorgon: ${date2}</h3>
            <p>${tomorrowWeather} °C</p>
            <p>${tomorrowWeatherSymbol}</p>`;

        const weather3HTML = 
            `<h3>Om två dagar: ${date3}</h3>
            <p>${inTwoDaysWeather} °C</p>
            <p>${inTwoDaysWeatherSymbol}</p>`;

        const weather4HTML = 
            `<h3>Om tre dagar: ${date4}</h3>
            <p>${inThreeDaysWeather} °C</p>
            <p>${inThreeDaysWeatherSymbol}</p>`;

            document.getElementById('today').innerHTML = weatherHTML;
            document.getElementById('tomorrow').innerHTML = weather2HTML;
            document.getElementById('twodays').innerHTML = weather3HTML;
            document.getElementById('threedays').innerHTML = weather4HTML;



    })
    .catch(error => {
        console.error('Kunde inte hämta vädret', error);
    });
}

// Funktion för att avkoda vädersymbolen till ett förståeligt format
function decodeWeatherSymbol(symbolCode) {
    const weatherSymbols = {
        1: 'Klart väder',
        2: 'Nästan klart väder',
        3: 'Växlande molnighet',
        4: 'Halvklart väder',
        5: 'Molnigt väder',
        6: 'Mulet',
        7: 'Dimma',
        8: 'Lätta regnskurar',
        9: 'Måttliga regnskurar',
        10: 'Kraftiga regnskurar',
        11: 'Åskväder',
        12: 'Lätt snöblandat regn',
        13: 'Måttligt snöblandat regn',
        14: 'Kraftigt snöblandat regn',
        15: 'Lätt snöskurar',
        16: 'Måttligt snöskurar',
        17: 'Kraftigt snöskurar',
        18: 'Lätt regn',
        19: 'Måttligt regn',
        20: 'Kraftigt regn',
        21: 'Åska',
        22: 'Lätt snöslask',
        23: 'Måttligt snöslask',
        24: 'Kraftigt snöslask',
        25: 'Lätt snöfall',
        26: 'Måttligt snöfall',
        27: 'Kraftigt snöfall'
    };

    // Returnera den avkodade vädersymbolen eller en generell förklaring om symbolen inte finns i listan
    return weatherSymbols[symbolCode] || 'Okänt väder';
}

function getMonthName(monthIndex) {
    const months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
    return months[monthIndex];
}

function getLocationAndWeather(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log(latitude, longitude);
            getWeather(latitude, longitude);
        }, 
        error => {
            console.error('Kunde inte hämta plats', error);
        });
        
    }
}

getLocationAndWeather();