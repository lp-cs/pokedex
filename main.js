const API_Data = {
    url: "https://pokeapi.co/api/v2/",
    type: 'pokemon',
    id: '26',
};

const {url, type, id} = API_Data;

const API_URL = `${url}${type}/${id}`;

fetch(API_URL)
    .then( (data) => data.json() )
    .then ( (pokemon) => generateHTML(pokemon) )
    
const generateHTML = (data) => {
    console.log(data);
    const html = `
        <div class="name">${data.name}</div>
        <img src=${data.sprites.front_default} />
        <div class="details">
            <span>Height: ${data.height} units</span>
            <span>Weight: ${data.weight} units</span>
        </div>
    `

    const pokemonDiv = document.querySelector('.pokemon')
    pokemonDiv.innerHTML = html;
}