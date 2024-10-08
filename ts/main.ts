// fetch from pokemon API
// interface for Pokemon Species

interface Pokemoncard {
  url: string;
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

interface PokemonInfo {
  abilities: string[];
  height: number;
  moves: string[];
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
  // from brett
  $pokemonColumn.dataset.url = pokemon.url;
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

// feature for when u click on a pokemon
// You'll add event listeners to each pokemon card, so that when you click on them it will do three things:
// Make an API call to get information for that specific pokemon
// Switch views
// Render the pokemon data on the screen with a DOM function and append it!

//
const $pokemonCard = document.querySelector('.pokemon-image-row');
if (!$pokemonCard) throw new Error('query for $pokemonCard failed');
// creating an event listener

// $pokemonCard.addEventListener('click', (event: any) => {

// }

// making API call
async function fetchUrl(name: Pokemoncard): Promise<void> {
  try {
    const fetchUrl = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${name}`,
    );

    if (!fetchUrl.ok) {
      throw new Error(`Error fetching Pokémon Url: ${fetchUrl.status}`);
    }
    const urlData = await fetchUrl.json();
    console.log('url data', urlData);
  } catch (error) {
    console.error('Error fetching Pokemon url:', error);
  }
}

async function fetchInfo(name: Pokemoncard): Promise<void> {
  try {
    const fetchAbilities = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    );

    if (!fetchAbilities.ok) {
      throw new Error(
        `Error fetching Pokémon Abilities: ${fetchAbilities.status}`,
      );
    }

    const pokeAbilities = await fetchAbilities.json();
    console.log(pokeAbilities);
  } catch (error) {
    console.error('Error fetching Pokemon Abilities:', error);
  }
}

// to render dom elements

function renderInfo(pokemon: Pokemoncard, id: string): any {
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');

  const $columnPokemonFeature = document.createElement('div');
  $columnPokemonFeature.setAttribute('class', 'column-pokemon-feature');
  $columnPokemonFeature.appendChild($row);

  const $pokemonImageContainer = document.createElement('div');
  $pokemonImageContainer.setAttribute('class', 'pokemon-image-container');
  $pokemonImageContainer.appendChild($columnPokemonFeature);

  const $image = document.createElement('img');
  $image.setAttribute('class', 'pokemon-image');
  $image.setAttribute('src', `images/downloads/${id}.png`);
  $image.setAttribute('alt', `pokemon image: ${id}`);
  $image.appendChild($pokemonImageContainer);

  const $pokemonInfoContainer = document.createElement('div');
  $pokemonInfoContainer.setAttribute('class', 'pokemon-info-container');
  $pokemonInfoContainer.appendChild($columnPokemonFeature);

  const $pokemonName = document.createElement('p');
  $pokemonName.setAttribute('class', 'pokemon-name');
  const capitilizedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  $pokemonName.textContent = `${capitilizedName} #${id}`;
  $pokemonName.appendChild($pokemonInfoContainer);

  const $tabbedViews = document.createElement('div');
  $tabbedViews.setAttribute('class', 'tabbed-views');
  $tabbedViews.appendChild($pokemonInfoContainer);

  const $viewContainer = document.createElement('div');
  $viewContainer.setAttribute('class', 'view-container');
  $viewContainer.appendChild($tabbedViews);

  const $viewInfo = document.createElement('div');
  $viewInfo.setAttribute('class', 'view');
  $viewInfo.setAttribute('data-view', 'info');
  $viewInfo.appendChild($viewContainer);

  const $info = document.createElement('div');
  $info.setAttribute('class', 'info');
  $info.appendChild($viewInfo);

  const $infoP = document.createElement('p');
  // $infoP.textContent =
  $infoP.appendChild($info);

  const $viewSpecialMoves = document.createElement('div');
  $viewSpecialMoves.setAttribute('class', 'view hidden');
  $viewSpecialMoves.setAttribute('data-view', 'special-moves');
  $viewSpecialMoves.appendChild($viewContainer);

  const $specialMoves = document.createElement('div');
  $specialMoves.setAttribute('class', 'special-moves');
  $specialMoves.appendChild($viewSpecialMoves);

  const $pSpecialMoves = document.createElement('p');
  // $pWeakness.textContent =
  $pSpecialMoves.appendChild($specialMoves);

  const $viewStats = document.createElement('div');
  $viewStats.setAttribute('class', 'view hidden');
  $viewStats.setAttribute('data-view', 'stats');
  $viewStats.appendChild($viewContainer);

  const $stats = document.createElement('div');
  $stats.setAttribute('class', 'stats');
  $stats.appendChild($viewStats);

  const $pStats = document.createElement('p');
  // $pWeakness.textContent =
  $pStats.appendChild($stats);

  const $tabContainer = document.createElement('div');
  $tabContainer.setAttribute('class', 'tab-container');
  $tabContainer.appendChild($tabbedViews);

  const $infoTab = document.createElement('div');
  $infoTab.setAttribute('class', 'tab active');
  $infoTab.setAttribute('data-view', 'info');
  $infoTab.textContent = 'Info';
  $infoTab.appendChild($tabContainer);

  const $specialMovesTab = document.createElement('div');
  $specialMovesTab.setAttribute('class', 'tab');
  $specialMovesTab.setAttribute('data-view', 'special-moves');
  $specialMovesTab.textContent = 'Special Moves';
  $specialMovesTab.appendChild($tabContainer);

  const $statsTab = document.createElement('div');
  $statsTab.setAttribute('class', 'tab');
  $statsTab.setAttribute('data-view', 'stats');
  $statsTab.textContent = 'Stats';
  $statsTab.appendChild($tabContainer);

  return $row;
}
