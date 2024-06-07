const favorites = [];

export const addFavorite = (track) => {
  const exists = favorites.find(fav => fav.trackId === track.trackId);
  if (!exists) {
    track.rating = null;
    favorites.push(track);
  }
};

export const addRating = (trackId, rating) => {
  const track = favorites.find(fav => fav.trackId === trackId);
  if (track) {
    track.rating = rating;
  }
};

export const getFavorites = () => {
  return favorites;
};
