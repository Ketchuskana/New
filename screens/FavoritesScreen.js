import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useFavorites();

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Detail', { item })}>
      <Image source={{ uri: item.artworkUrl100 }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.trackName}>{item.trackName}</Text>
        <Text style={styles.artistName}>by {item.artistName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={renderFavoriteItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
  },
  trackName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  artistName: {
    fontSize: 14,
    color: '#666',
  },
});

export default FavoritesScreen;
