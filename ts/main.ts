// fetch from pokemon API
// interface for Pokemon Species

interface PokemonSpecies {
  name: string;
  url: string;
}

interface PokemonType {
  type: {
    name: string;
  };
}

interface Pokemoncard {
  imageUrl: string;
  name: string;
}

// querying for pokemon row
const $pokemonRow = document.querySelector('.pokemon-image-row');
// querying for changing the type
const $changeType = document.querySelector('#change-type') as HTMLSelectElement;

async function fetchPokemonType(): Promise<void> {
  try {
    const responseType = await fetch('https://pokeapi.co/api/v2/pokemon/');

    if (!responseType.ok) {
      throw new Error(`Error fetching Pokémon species: ${responseType.status}`);
    }

    const type = await responseType.json();

    console.log('type', type.results);
  } catch (error) {
    console.error('Error fetching Pokémon types:', error);
  }
}

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
