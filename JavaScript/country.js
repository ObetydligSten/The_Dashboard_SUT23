
function searchCountry(){
    const countryName = document.getElementById('namesearch').value.trim();
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok){
            throw new Error('Landet kunde inte hittas, kom ihåg att det måste skrivas på engelska');
        }
        return response.json();
    })
    .then(data => {
        const country = data[0];
        const currencies = country.currencies;
        const currencyCodes = Object.keys(currencies);
        const currencyCode = currencyCodes[0];
        const currency = currencies[currencyCode];

        const languages = country.languages;
        const languageList = Object.keys(languages).map(code => {
            return `${languages[code]} (${code.toUpperCase()})`;
        }).join(', ');

        const currencyInfo = `${currencyCode}, ${currency.name}`;

        const countryInfo = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.svg}" alt="Flagga" style="max-width: 100px; max-height: 75px;">
        <p><strong>Huvudstad:</strong> ${country.capital}</p>
        <p><strong>Invånare:</strong> ${country.population}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Valuta:</strong> ${currencyInfo}</p>
        <p><strong>Språk:</strong> ${languageList}</p>
        <p><strong>Tidszoner:</strong> ${country.timezones}</p>
    `;
    document.getElementById('country').innerHTML = countryInfo;
    })
}


