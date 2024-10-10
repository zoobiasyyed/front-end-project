"use strict";
/* exported data */
// local storage for my favorites page
const favoritesData = readFavoritesData();
function serializeFavoritesData() {
    const serializedData = JSON.stringify(favoritesData);
    localStorage.setItem('favorites-storage', serializedData);
}
function readFavoritesData() {
    const data = localStorage.getItem('favorites-storage');
    if (data) {
        const parseData = JSON.parse(data);
        return parseData;
    }
    else {
        return {
            favorites: [],
        };
    }
}
