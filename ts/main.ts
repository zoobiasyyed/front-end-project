// fetch from pokemon API
// interface for Pokemon Species

interface Pokemoncard {
  imageUrl: string;
  name: string;
}

interface Regions {
  kanto: string;
  johto: string;
  hoenn: string;
  sinnoh: string;
  unova: string;
  kalos: string;
  alola: string;
  galar: string;
  paldea: string;
}

type Region =
  | 'kanto'
  | 'johto'
  | 'hoenn'
  | 'sinnoh'
  | 'unova'
  | 'kalos'
  | 'alola'
  | 'galar'
  | 'paldea';

// creating object of regions

let allPokemonData: Pokemoncard[] = [];

const regionsObj: Regions = {
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
// create event listener for the regions tab, event bubbling
const $allPokemon = document.querySelector('#all-button');
if (!$allPokemon) throw new Error('The $Allpokemon query failed');

const $kantoButton = document.querySelector('#kanto');
if (!$kantoButton) throw new Error('The $kantoButton query failed');

const $johtoButton = document.querySelector('#johto');
if (!$johtoButton) throw new Error('The $johtoButton query failed');

const $hoennButton = document.querySelector('#hoenn');
if (!$hoennButton) throw new Error('The $hoennButton query failed');

const $sinnohButton = document.querySelector('#sinnoh');
if (!$sinnohButton) throw new Error('The $sinnohButton query failed');

const $unovaButton = document.querySelector('#unova');
if (!$unovaButton) throw new Error('The $unovaButton query failed');

const $kalosButton = document.querySelector('#kalos');
if (!$kalosButton) throw new Error('The $kalosButton query failed');

const $alolaButton = document.querySelector('#alola');
if (!$alolaButton) throw new Error('The $alolaButton query failed');

const $galarButton = document.querySelector('#galar');
if (!$galarButton) throw new Error('The $galarButton query failed');

const $paldeaButton = document.querySelector('#paldea');
if (!$paldeaButton) throw new Error('The $paldeaButton query failed');

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
    // storing into empty array
    allPokemonData = data.results;

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
  } catch (error) {
    console.error('Error fetching legendary Pokémon:', error);
  }
}

fetchLegendaryPokemon();

// FETCHING REGION CONTENT

async function fetchRegionOfPokemon(regionURL: string): Promise<void> {
  try {
    const fetchRegion = await fetch(regionURL);

    if (!fetchRegion.ok) {
      throw new Error(`Error fetching Pokémon species: ${fetchRegion.status}`);
    }
    // for response
    const regionData = await fetchRegion.json();
    const listOfPokemon = regionData.pokemon_entries;

    for (let i = 0; i < listOfPokemon.length; i++) {
      let correctId = '';
      for (let x = 0; x < allPokemonData.length; x++) {
        if (allPokemonData[x].name === listOfPokemon[i].pokemon_species.name) {
          correctId = (x + 1).toString();
        }
      }

      let formatedId: string;

      if (parseInt(correctId) < 10) {
        formatedId = '000' + correctId;
      } else if (parseInt(correctId) < 100) {
        formatedId = '00' + correctId;
      } else if (parseInt(correctId) < 1000) {
        formatedId = '0' + correctId;
      } else {
        formatedId = correctId;
      }

      const renderData = renderPokemon(
        listOfPokemon[i].pokemon_species,
        formatedId,
      );

      $pokemonRow?.appendChild(renderData);
    }
  } catch (error) {
    console.error('Error fetching legendary Pokémon:', error);
  }
}

// RENDERING POKEMON CONTENT

function renderPokemon(pokemon: Pokemoncard, id: string): HTMLElement {
  const $pokemonColumn = document.createElement('div');
  $pokemonColumn.setAttribute('class', 'column-half');
  $pokemonColumn.className =
    'column-half column-third column-fourth column-fifth column-sixth';

  const $pokemonCard = document.createElement('div');
  $pokemonCard.setAttribute('class', 'pokemon-card');

  const $pokemonImage = document.createElement('img');
  $pokemonImage.setAttribute('class', 'pokemon-image');
  $pokemonImage.setAttribute('src', `images/downloads/${id}.png`);
  $pokemonImage.setAttribute('alt', `pokemon image: ${id}`);

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

// to clear screen of pokemon
function clearPokemon(): void {
  const $pokemonRow = document.querySelector('.pokemon-image-row');
  if ($pokemonRow) {
    $pokemonRow.innerHTML = '';
  }
}

const $regionRow = document.querySelector('.region-row');

$regionRow?.addEventListener('click', (event: Event) => {
  const eventTarget = event.target as HTMLElement;
  const $closestRegion = eventTarget?.closest('a');

  if ($closestRegion) {
    const regionId = $closestRegion.id as Region;

    const regionUrl = regionsObj[regionId];

    if (regionUrl) {
      clearPokemon();
      fetchRegionOfPokemon(regionUrl);
    }
  }
});

$allPokemon.addEventListener('click', () => {
  clearPokemon();
  fetchLegendaryPokemon();
});
