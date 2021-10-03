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
    const types = data.types;
    const abilities = data.abilities;
    const moves = data.moves;
    const stats = data.stats;

    const pokemon_name_div = document.querySelector('.pokemon_name');
    const pokemon_ability_div = document.querySelector('.ability_list');
    const pokemon_sprite_div = document.querySelector('.pokemon_sprites');
    const pokemon_details_div = document.querySelector('.detail_list');
    const pokemon_types_div = document.querySelector('.type_list');
    const pokemon_stats_div = document.querySelector('.stat_list');
    const pokemon_moves_div = document.querySelector('.move_list');

    pokemon_name_div.innerHTML = "";
    pokemon_types_div.innerHTML = "";
    pokemon_sprite_div.innerHTML = "";
    pokemon_details_div.innerHTML = "";
    pokemon_ability_div.innerHTML = "";
    pokemon_stats_div.innerHTML = "";
    pokemon_moves_div.innerHTML = "";

    pokemon_name_div.innerHTML = 
        "<h1>[" + data.id + "]&nbsp" + data.name.toUpperCase() + "</h1>"
    ;

    types.forEach(types =>  pokemon_types_div.innerHTML += 
        "<span class='badge bg-secondary'>" + types.type.name + "</span>&nbsp"
    );

    pokemon_sprite_div.innerHTML = `
        <div class="carousel-item active">
            <img class="d-block mx-auto" style="width:200px" src="${sprites.front_default}" />
        </div>
        <div class="carousel-item">
            <img class="d-block mx-auto" style="width:200px" src="${sprites.back_default}" />
        </div>
        <div class="carousel-item">
            <img class="d-block mx-auto" style="width:200px" src="${sprites.front_shiny}" />
        </div>
        <div class="carousel-item">
            <img class="d-block mx-auto" style="width:200px" src="${sprites.back_shiny}" />
        </div>
    `;

    pokemon_stats_div.innerHTML = `
        <p><strong>Health Points:</strong> <span id="stats_hp">${stats[0].base_stat}</span></p>
        <p><strong>Attack:</strong> <span id="stats_atk">${stats[1].base_stat}</span></p>
        <p><strong>Defense:</strong> <span id="stats_def">${stats[2].base_stat}</span></p>
        <p><strong>Special Attack:</strong> <span id="stats_satk">${stats[3].base_stat}</span></p>
        <p><strong>Special Defense:</strong> <span id="stats_sdef">${stats[4].base_stat}</span></p>
        <p><strong>Speed:</strong> <span id="stats_spd">${stats[5].base_stat}</span></p>
    `;

    var pokemon_details = `
        <p><strong>Height:</strong> ${data.height} dm</p>
        <p><strong>Weight:</strong> ${data.weight} hg</p>
    `;

    pokemon_details_div.innerHTML = pokemon_details;

    pokemon_ability_div.innerHTML = "<strong>Abilities: </strong>";

    pokemon_ability_div.innerHTML += abilities.map(abilities => abilities.ability.name);

    moves.forEach(moves =>  pokemon_moves_div.innerHTML += 
        "<li class='list-group-item'>" + moves.move.name + "</li>"
    );
}

const generateError = () => {
    const pokemon_name_div = document.querySelector('.pokemon_name');
    const pokemon_ability_div = document.querySelector('.ability_list');
    const pokemon_sprite_div = document.querySelector('.pokemon_sprites');
    const pokemon_details_div = document.querySelector('.detail_list');
    const pokemon_types_div = document.querySelector('.type_list');
    const pokemon_stats_div = document.querySelector('.stat_list');
    const pokemon_moves_div = document.querySelector('.move_list');

    pokemon_name_div.innerHTML =`
        <div class='alert alert-danger'>
            <strong>Failed!</strong> Pokemon is not on the list.
        </div>`;
    pokemon_sprite_div.innerHTML = "[No Image to Display]";
    pokemon_details_div.innerHTML = "<p class='text-center'>[No Details to Display]</p>";
    pokemon_types_div.innerHTML = "";
    pokemon_ability_div.innerHTML = "";
    pokemon_stats_div.innerHTML = "";
    pokemon_moves_div.innerHTML = "No Moves to Display";
}
