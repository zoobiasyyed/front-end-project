// fetch from pokemon API
// interface for Pokemon Species

interface Pokemoncard {
  imageUrl: string;
  name: string;
}

// creating object of regions

const regionsObj = {
  kanto: 'https://pokeapi.co/api/v2/pokedex/2',
  johto: 'https://pokeapi.co/api/v2/pokedex/3',
  hoenn: 'https://pokeapi.co/api/v2/pokedex/4',
  sinnoh: 'https://pokeapi.co/api/v2/pokedex/5',
  unova: 'https://pokeapi.co/api/v2/pokedex/8',
  kalos: 'https://pokeapi.co/api/v2/pokedex/12',
  alola: 'https://pokeapi.co/api/v2/pokedex/16',
  galar: 'https://pokeapi.co/api/v2/pokedex/27',
  paldea: 'https://pokeapi.co/api/v2/pokedex/31',
};

// querying for pokemon row
const $pokemonRow = document.querySelector('.pokemon-image-row');

// FETCHING ALL POKEMON CONTENT
async function fetchLegendaryPokemon(): Promise<void> {
  try {
    // Fetch all Pokémon species data (using a large limit)
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon-species?limit=6000',
    );

    if (!response.ok) {
      throw new Error(`Error fetching Pokémon species: ${response.status}`);
    }

    // for response
    const data = await response.json();

    console.log('data', data.results);

    for (let i = 0; i < data.results.length; i++) {
      const id = i + 1;
      let formatedId: any = null;

      if (id < 10) {
        formatedId = '000' + id;
      } else if (id < 100) {
        formatedId = '00' + id;
      } else if (id < 1000) {
        formatedId = '0' + id;
      } else {
        formatedId = id;
      }

      const renderData = renderPokemon(data.results[i], formatedId);
      $pokemonRow?.appendChild(renderData);
    }

    console.log(data);
  } catch (error) {
    console.error('Error fetching legendary Pokémon:', error);
  }
}

fetchLegendaryPokemon();

// RENDERING POKEMON CONTENT

function renderPokemon(pokemon: Pokemoncard, id: string): HTMLElement {
  const $pokemonColumn = document.createElement('div');
  $pokemonColumn.setAttribute('class', 'column-half');

  const $pokemonCard = document.createElement('div');
  $pokemonCard.setAttribute('class', 'pokemon-card');

  const $pokemonImage = document.createElement('img');
  $pokemonImage.setAttribute('class', 'pokemon-image');
  $pokemonImage.setAttribute('src', `images/downloads/${id}.png`);

  const $pForPokemonCard = document.createElement('p');
  $pForPokemonCard.setAttribute('class', 'pokemon-description');

  const capitilizedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  $pForPokemonCard.textContent = `${capitilizedName} #${id}`;

  $pokemonCard.appendChild($pokemonImage);
  $pokemonCard.appendChild($pForPokemonCard);
  $pokemonColumn.appendChild($pokemonCard);

  return $pokemonColumn;
}

// FETCHING REGION CONTENT

async function fetchRegionOfPokemon(): Promise<void> {
  try {
    const fetchRegion = await fetch('https://pokeapi.co/api/v2/pokedex/4');

    if (!fetchRegion.ok) {
      throw new Error(`Error fetching Pokémon species: ${fetchRegion.status}`);
    }

    // for response
    const regionData = await fetchRegion.json();

    console.log('regionData', regionData);
  } catch (error) {
    console.error('Error fetching legendary Pokémon:', error);
  }
}

fetchRegionOfPokemon();

// create event listener for the regions tab, event bubbling
const $Allpokemon = document.querySelector('#all-button');
if (!$Allpokemon) throw new Error('The $Allpokemon query failed');

const $kantoButton = document.querySelector('#kanto-button');
if (!$kantoButton) throw new Error('The $kantoButton query failed');

const $johtoButton = document.querySelector('#johto-button');
if (!$johtoButton) throw new Error('The $johtoButton query failed');

const $hoennButton = document.querySelector('#hoenn-button');
if (!$hoennButton) throw new Error('The $hoennButton query failed');

const $sinnohButton = document.querySelector('#sinnoh-button');
if (!$sinnohButton) throw new Error('The $sinnohButton query failed');

const $unovaButton = document.querySelector('#unova-button');
if (!$unovaButton) throw new Error('The $unovaButton query failed');

const $kalosButton = document.querySelector('#kalos-button');
if (!$kalosButton) throw new Error('The $kalosButton query failed');

const $alolaButton = document.querySelector('#alola-button');
if (!$alolaButton) throw new Error('The $alolaButton query failed');

const $galarButton = document.querySelector('#galar-button');
if (!$galarButton) throw new Error('The $galarButton query failed');

const $paldeaButton = document.querySelector('#paldea-button');
if (!$paldeaButton) throw new Error('The $paldeaButton query failed');
