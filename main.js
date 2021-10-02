const pokedex_url = "https://pokeapi.co/api/v2/";
const creature_type = "pokemon";

api_data_search();

function api_data_search() {
    var pokemon_id = document.querySelector('#idsearch').value.toLowerCase();
    var api_data = { 
        url: pokedex_url,
        type: creature_type,
        id: pokemon_id
    }

    var {url, type, id} = api_data;
    var api_url = `${url}${type}/${id}`;

    fetch_data(api_url);
}

function fetch_data(api_url) {
    fetch(api_url)
        .then( (data) => data.json() )
        .then( (pokemon) => generateHTML(pokemon) )  
        .catch( (error) => generateError() ) 
}

const generateHTML = (data) => {
    console.log(data);
    var html = `
        <div class="name">${data.id}</div>
        <img src=${data.sprites.front_default} />
        <div class="details">
            <p>Name: ${data.name}</p>
            <p>Height: ${data.height} units</p>
            <p>Weight: ${data.weight} units</p>
        </div>
    `

    const pokemonDiv = document.querySelector('.pokemon')
    pokemonDiv.innerHTML = html;
}

const generateError = () => {
    var html = `<p> No Pokemon Found! </p>`
    const pokemonDiv = document.querySelector('.pokemon')
    pokemonDiv.innerHTML = html;
}