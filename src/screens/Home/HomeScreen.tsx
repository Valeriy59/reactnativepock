import React, {useEffect, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {api, PokemonItem} from "../../api/api";
import {NUM_COLUMNS, PADDING, WIDTH} from "../../constant/constant";
import {useAppNavigation} from "../../types";


export const HomeScreen = () => {
  const {navigate} = useAppNavigation()

  const [allPokemon, setAllPokemon] = useState<PokemonItem[]>([])
  useEffect(() => {
    api.getAllPokemon().then((resp) => {
      setAllPokemon(resp.data.results)
    })
  }, [])

  const renderItem: ListRenderItem<PokemonItem> = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {navigate('Details', {url: item.url})}}
      >
        <View>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={allPokemon}
        renderItem={renderItem}
        numColumns={NUM_COLUMNS}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING
  },
  item: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    width: (WIDTH - PADDING * 2) / NUM_COLUMNS - 5,
    marginVertical: 5,
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 20,
    textAlign: 'center'
  }
})