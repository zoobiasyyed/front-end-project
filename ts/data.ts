/* exported data */
// local storage for my favorites page

interface FavoritesData {
  favorites: Pokemoncard[];
}

const favoritesData: FavoritesData = readFavoritesData();

function serializeFavoritesData(): void {
  const serializedData = JSON.stringify(favoritesData);
  localStorage.setItem('favorites-storage', serializedData);
}

function readFavoritesData(): FavoritesData {
  const data = localStorage.getItem('favorites-storage');
  if (data) {
    const parseData = JSON.parse(data);
    return parseData;
  } else {
    return {
      favorites: [],
    };
  }
}
