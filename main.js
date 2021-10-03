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

    const sprites = data.sprites;
    const moves = data.moves;
    const abilities = data.abilities;

    const pokemon_name_div = document.querySelector('.pokemon_name');
    const pokemon_sprite_div = document.querySelector('.pokemon_sprites');
    const pokemon_details_div = document.querySelector('.pokemon_details');
    const pokemon_ability_div = document.querySelector('.ability_list');
    const pokemon_moves_div = document.querySelector('.move_list');

    var pokemon_details = `
        <div class="details">
            <p>ID Number: ${data.id}</p>
            <p>Height: ${data.height} dm</p>
            <p>Weight: ${data.weight} hg</p>
        </div>
    `;

    abilities.forEach(abilities =>  pokemon_ability_div.innerHTML += 
        "<li>" + abilities.ability.name + "</li>"
    );

    pokemon_sprite_div.innerHTML = `
        <img id="front_default_sprite" class="pokemon_sprite" src="${sprites.front_default}" />
        <img id="back_default_sprite" class="pokemon_sprite" src="${sprites.back_default}" />
        <img id="front_shiny_sprite" class="pokemon_sprite" src="${sprites.front_shiny}" />
        <img id="back_shiny_sprite" class="pokemon_sprite" src="${sprites.back_shiny}" />
    `;
    
    display_sprite("front_default");

    pokemon_name_div.innerHTML = 
        "<h1>" + data.name.toUpperCase() + "</h1>"
    ;

    pokemon_details_div.innerHTML = pokemon_details;

    moves.forEach(moves =>  pokemon_moves_div.innerHTML += 
        "<li>" + moves.move.name + "</li>"
    );
}

const generateError = () => {
    var html = `<p> No Pokemon Found! </p>`
    const error_message = document.querySelector('.pokemon_details');
    error_message.innerHTML = html;
}

function display_sprite(sprite_details){
    const front_sprite =  document.querySelector('#front_default_sprite');
    const back_sprite =  document.querySelector('#back_default_sprite');
    const front_shiny = document.querySelector('#front_shiny_sprite');
    const back_shiny = document.querySelector('#back_shiny_sprite');

    hide_sprite();

    switch(sprite_details) {
        case "front_default":
            front_sprite.style.display = "block"; 
          break;
        case "back_default":  
            back_sprite.style.display = "block"; 
          break;
        case "front_shiny":
            front_shiny.style.display = "block"; 
          break;
        case "back_shiny":
            back_shiny.style.display = "block"; 
          break;
        default:
            return false;
      }
}

function hide_sprite(){
    const pokemon_sprites = document.querySelectorAll('.pokemon_sprite');
    pokemon_sprites.forEach(function(sprite) {
       sprite.style.display = "none";
     });
}
