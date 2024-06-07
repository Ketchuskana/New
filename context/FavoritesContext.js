import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (track) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.find(fav => fav.trackId === track.trackId)) {
        return [...prevFavorites, track];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (trackId) => {
    setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.trackId !== trackId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);

export const useFavoritesActions = () => {
  const { addFavorite, removeFavorite } = useFavorites();
  return { addFavorite, removeFavorite };
};
