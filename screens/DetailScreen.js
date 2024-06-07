import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Image, Alert, StyleSheet  } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { addRating, getFavorites } from '../services/favorites';


const DetailScreen = ({ route }) => {
  const { item } = route.params;
  const { addFavorite } = useFavorites();
  const [rating, setRating] = useState(item.rating ? item.rating.toString() : '');
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    const favoriteTrack = favorites.find(fav => fav.trackId === item.trackId);
    if (favoriteTrack && favoriteTrack.rating !== null) {
      setRating(favoriteTrack.rating.toString());
      setHasRated(true);
    }
  }, [item.trackId]);

  const handleAddFavorite = () => {
    addFavorite(item);
    Alert.alert('Success', `${item.trackName} has been added to your favorites`);
  };

  const handleRate = () => {
    const numericRating = parseFloat(rating);
    if (numericRating > 0 && numericRating <= 5) {
      addRating(item.trackId, numericRating);
      setHasRated(true);
      Alert.alert('Success', `You rated ${item.trackName} with ${numericRating} stars`);
    } else {
      Alert.alert('Error', 'Please enter a rating between 1 and 5');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.artworkUrl100 }} style={styles.image} />
      <Text style={styles.title}>Track: {item.trackName}</Text>
      <Text style={styles.text}>Artist: {item.artistName}</Text>
      <Text style={styles.text}>Album: {item.collectionName}</Text>
      <Button title="Add to Favorites" onPress={handleAddFavorite} />
      <View style={{ marginTop: 20 }}>
        {hasRated ? (
          <Text>You rated this track: {rating} stars</Text>
        ) : (
          <>
            <TextInput
              placeholder="Rate this track (1-5)"
              value={rating}
              onChangeText={setRating}
              keyboardType="numeric"
              editable={!hasRated}
            />
            <Button title="Rate" onPress={handleRate} disabled={hasRated} />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DetailScreen;
