// fetch from pokemon API
// interface for Pokemon Species

interface Pokemoncard {
  url: string;
  name: string;
  flavorTextEntries: string[];
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
  name: string;
  abilities: string[];
  stats: any[];
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
  $pokemonColumn.dataset.name = pokemon.name;
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
      swapView('main');
    }
  }
});

$allPokemon.addEventListener('click', () => {
  clearPokemon();
  fetchLegendaryPokemon();
  swapView('main');
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

$pokemonCard.addEventListener('click', async (event: Event) => {
  const eventTarget = event.target as HTMLElement;
  const clickedCard = eventTarget.closest('.column-half') as HTMLElement;
  if (!clickedCard) return;

  const datasetName = clickedCard.dataset.name;
  if (!datasetName) return;

  try {
    const flavorText = await fetchUrl(datasetName);
    const pokemonDetails = await fetchInfo(datasetName);

    if (flavorText && pokemonDetails) {
      // create an object bc we need to pass into render info
      const pokemonCardData: Pokemoncard = {
        url: '',
        name: datasetName,
        flavorTextEntries: [flavorText],
      };

      const pokemonInfoContainer = document.querySelector(
        '[data-view="pokemon-info"]',
      );
      if (pokemonInfoContainer) {
        pokemonInfoContainer.innerHTML = '';
        const renderedInfo = renderInfo(pokemonCardData, pokemonDetails);
        pokemonInfoContainer.appendChild(renderedInfo);

        // need to query the data views
        document
          .querySelector('[data-view="pokemon-info"]')
          ?.classList.remove('hidden');

        document
          .querySelector('[data-view="main-form"]')
          ?.classList.add('hidden');
      }
    } else {
      console.error('Failed to retrieve Pokémon data');
    }
  } catch (error) {
    console.error('Error handling Pokémon click:', error);
  }
});

// making API call
async function fetchUrl(name: string): Promise<string | undefined> {
  try {
    const fetchUrl = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${name}`,
    );

    if (!fetchUrl.ok) {
      throw new Error(`Error fetching Pokémon Url: ${fetchUrl.status}`);
    }
    const urlData = await fetchUrl.json();
    console.log(urlData);

    // find english version ONLY gang
    // for loop through urldata.flavor_entried.length
    for (let i = 0; i < urlData.flavor_text_entries.length; i++) {
      const englishOnly = urlData.flavor_text_entries[i];
      if (englishOnly.language.name === 'en') {
        return englishOnly.flavor_text;
      }
    }

    return urlData.flavor_text_entries[0].flavor_text;
  } catch (error) {
    console.error('Error fetching Pokemon url:', error);
  }
}

async function fetchInfo(name: string): Promise<PokemonInfo | undefined> {
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
    return pokeAbilities;
  } catch (error) {
    console.error('Error fetching Pokemon Abilities:', error);
  }
}

// need this for the image path
function formatId(id: number): string {
  if (id < 10) {
    return '000' + id;
  } else if (id < 100) {
    return '00' + id;
  } else if (id < 1000) {
    return '0' + id;
  } else {
    return id.toString();
  }
}

// to render dom elements

function renderInfo(pokemon: Pokemoncard, pokeStats: PokemonInfo): HTMLElement {
  const $pokemonInfoView = document.createElement('div');
  $pokemonInfoView.setAttribute('data-view', 'pokemon-info');

  const $container = document.createElement('div');
  $container.setAttribute('class', 'container background');
  $pokemonInfoView.appendChild($container);

  const $boxFeature = document.createElement('div');
  $boxFeature.setAttribute('class', 'box-feature');
  $container.appendChild($boxFeature);

  // Row for heart button
  const $heartRow = document.createElement('div');
  $heartRow.setAttribute('class', 'row');
  $boxFeature.appendChild($heartRow);

  const $heartColumn = document.createElement('div');
  $heartColumn.setAttribute('class', 'column-full');
  $heartRow.appendChild($heartColumn);

  const $heartButton = document.createElement('button');
  $heartButton.setAttribute('class', 'heart');
  $heartButton.type = 'button';
  $heartButton.textContent = '♡';
  $heartColumn.appendChild($heartButton);

  // Row for Pokémon info
  const $infoRow = document.createElement('div');
  $infoRow.setAttribute('class', 'row');
  $boxFeature.appendChild($infoRow);

  const $columnPokemonFeature = document.createElement('div');
  $columnPokemonFeature.setAttribute('class', 'column-pokemon-feature');
  $infoRow.appendChild($columnPokemonFeature);

  // Pokémon image container
  const $pokemonImageContainer = document.createElement('div');
  $pokemonImageContainer.setAttribute('class', 'pokemon-image-container');
  $columnPokemonFeature.appendChild($pokemonImageContainer);

  const $image = document.createElement('img');
  $image.setAttribute('class', 'pokemon-image-feature');
  let pokemonIndex = 0;
  for (let i = 0; i < allPokemonData.length; i++) {
    if (allPokemonData[i].name === pokemon.name) {
      pokemonIndex = i;
      break;
    }
  }
  const formattedId = formatId(pokemonIndex + 1);
  $image.setAttribute('src', `images/downloads/${formattedId}.png`);
  $image.setAttribute('alt', `pokemon image: ${pokemon.name}`);
  $pokemonImageContainer.appendChild($image);

  // Pokémon information container
  const $pokemonInfoContainer = document.createElement('div');
  $pokemonInfoContainer.setAttribute('class', 'pokemon-info-container');
  $columnPokemonFeature.appendChild($pokemonInfoContainer);

  const $pokemonName = document.createElement('p');
  $pokemonName.setAttribute('class', 'pokemon-name');
  const capitilizedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  $pokemonName.textContent = `${capitilizedName} #${formattedId}`;
  $pokemonInfoContainer.appendChild($pokemonName);

  const $tabbedViews = document.createElement('div');
  $tabbedViews.setAttribute('class', 'tabbed-views');
  $pokemonInfoContainer.appendChild($tabbedViews);

  const $viewContainer = document.createElement('div');
  $viewContainer.setAttribute('class', 'view-container');
  $tabbedViews.appendChild($viewContainer);

  // Info view
  const $viewInfo = document.createElement('div');
  $viewInfo.setAttribute('class', 'view');
  $viewInfo.setAttribute('data-view', 'info');
  $viewContainer.appendChild($viewInfo);

  const $info = document.createElement('div');
  $info.setAttribute('class', 'info');
  $viewInfo.appendChild($info);

  const $infoP = document.createElement('p');
  const dataInfo = pokemon.flavorTextEntries[0];
  $infoP.textContent = `${dataInfo}`;
  $info.appendChild($infoP);

  // Special Moves and Stats views
  const $viewSpecialMoves = document.createElement('div');
  $viewSpecialMoves.setAttribute('class', 'view hidden');
  $viewSpecialMoves.setAttribute('data-view', 'special-moves');
  $viewContainer.appendChild($viewSpecialMoves);

  const $specialMoves = document.createElement('div');
  $specialMoves.setAttribute('class', 'special-moves');
  $viewSpecialMoves.appendChild($specialMoves);

  const $pSpecialMoves = document.createElement('p');
  for (let i = 1; i < pokeStats.abilities.length; i++) {
    $pSpecialMoves.textContent = pokeStats.abilities[i];
  }
  $specialMoves.appendChild($pSpecialMoves);

  const $viewStats = document.createElement('div');
  $viewStats.setAttribute('class', 'view hidden');
  $viewStats.setAttribute('data-view', 'stats');
  $viewContainer.appendChild($viewStats);

  const $stats = document.createElement('div');
  $stats.setAttribute('class', 'stats');
  $viewStats.appendChild($stats);

  const $pStats = document.createElement('p');
  for (let i = 1; i < pokeStats.stats.length; i++) {
    $pStats.textContent = pokeStats.stats[i];
  }
  $stats.appendChild($pStats);

  // Tabs for switching between views
  const $tabContainer = document.createElement('div');
  $tabContainer.setAttribute('class', 'tab-container');
  $tabbedViews.appendChild($tabContainer);

  const $infoTab = document.createElement('div');
  $infoTab.setAttribute('class', 'tab active');
  $infoTab.setAttribute('data-view', 'info');
  $infoTab.textContent = 'Info';
  $tabContainer.appendChild($infoTab);

  const $specialMovesTab = document.createElement('div');
  $specialMovesTab.setAttribute('class', 'tab');
  $specialMovesTab.setAttribute('data-view', 'special-moves');
  $specialMovesTab.textContent = 'Special Moves';
  $tabContainer.appendChild($specialMovesTab);

  const $statsTab = document.createElement('div');
  $statsTab.setAttribute('class', 'tab');
  $statsTab.setAttribute('data-view', 'stats');
  $statsTab.textContent = 'Stats';
  $tabContainer.appendChild($statsTab);

  // creating event listeners for the tabs at least

  $infoTab.addEventListener('click', () => {
    $infoTab.classList.add('active');
    $specialMovesTab.classList.remove('active');
    $statsTab.classList.remove('active');

    $viewInfo.classList.remove('hidden');
    $viewSpecialMoves.classList.add('hidden');
    $viewStats.classList.add('hidden');
  });

  $specialMovesTab.addEventListener('click', () => {
    $specialMovesTab.classList.add('active');
    $infoTab.classList.remove('active');
    $statsTab.classList.remove('active');

    $viewSpecialMoves.classList.remove('hidden');
    $viewInfo.classList.add('hidden');
    $viewStats.classList.add('hidden');
  });

  $statsTab.addEventListener('click', () => {
    $statsTab.classList.add('active');
    $infoTab.classList.remove('active');
    $specialMovesTab.classList.remove('active');

    $viewStats.classList.remove('hidden');
    $viewInfo.classList.add('hidden');
    $viewSpecialMoves.classList.add('hidden');
  });

  return $pokemonInfoView;
}

function swapView(view: 'main' | 'pokemon-info'): void {
  const $mainView = document.querySelector('[data-view="main-form"]');
  const $pokemonInfoView = document.querySelector('[data-view="pokemon-info"]');

  if (!$mainView || !$pokemonInfoView) return;

  if (view === 'main') {
    $mainView.classList.remove('hidden');
    $pokemonInfoView.classList.add('hidden');
  } else {
    $mainView.classList.add('hidden');
    $pokemonInfoView.classList.remove('hidden');
  }
}
